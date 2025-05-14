import asyncHandler from "express-async-handler";
import Job from "../models/JobModel.js";
import { User } from "../models/userModel.js";


// Job creation route
export const createJob = asyncHandler(async (req, res) => {
    try {
        console.log("Authenticated User:", req.user);

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { title, description, location, tags, skills, jobType } = req.body;

        // Validation checks
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }
        if (!location) {
            return res.status(400).json({ message: "Location is required" });
        }
        if (!skills || !Array.isArray(skills) || skills.length === 0) {
            return res.status(400).json({ message: "At least one skill is required" });
        }
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({ message: "At least one tag is required" });
        }

        const job = new Job({
            title,
            description,
            location,
            tags,
            skills,
            jobType,
            createdBy: user._id,
        });

        await job.save();

        return res.status(201).json(job); // Send job after creation

    } catch (error) {
        console.error("Error in createJob:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});



// Get all jobs
export const getJobs = asyncHandler(async (req, res) => {
    try {
        const jobs = await Job.find({}).populate("createdBy", "name profilePicture").sort({ createdAt: -1 });
        return res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in getJobs:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Get jobs by user
export const getJobsByUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const jobs = await Job.find({ createdBy: user._id }).populate("createdBy", "name profilePicture");

        return res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in getJobsByUser:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Search jobs
export const searchJobs = asyncHandler(async (req, res) => {
    try {
        const { tags, title, location } = req.query;
        let query = {};
        if (tags) {
            query.tags = { $in: tags.split(",") };
        }
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }
        if (title) {
            query.title = { $regex: title, $options: "i" };
        }
        const jobs = await Job.find(query).populate("createdBy", "name profilePicture");
        return res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in searchJobs:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Apply for a job
export const applyJob = asyncHandler(async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user has already applied
        if (job.applicants.includes(user._id)) {
            return res.status(400).json({ message: "Already applied for this job" });
        }

        // Add user to the job's applicants
        job.applicants.push(user._id);
        job.applicantsCount = job.applicants.length;

        // Add job to the user's appliedJobs
        user.appliedJobs.push(job._id);

        // Save both
        await job.save();
        await user.save();

        return res.status(200).json({ message: "Applied for the job successfully", job });
    } catch (error) {
        console.log("Error in applyJob:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

export const likeJob = asyncHandler(async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isLiked = job.likes.includes(user._id);
        if (isLiked) {
            job.likes = job.likes.filter((like) => !like.equals(user._id));
            user.savedJobs = user.savedJobs.filter((jobId) => !jobId.equals(job._id));
        } else {
            job.likes.push(user._id);
            user.savedJobs.push(job._id);
        }

        await job.save();
        await user.save();

        return res.status(200).json(job);
    } catch (error) {
        console.log("Error in likeJob:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

export const getJobById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id).populate("createdBy", "name profilePicture");
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json(job);
    } catch (error) {
        console.log("Error in getJobById:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Delete job
export const deleteJob = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        const user = await User.findById(req.user.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await job.deleteOne({ _id: id });
        return res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.log("Error in deleteJob:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// Get job applicants
export const getJobApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const currentUserId = req.user.id;

        const job = await Job.findById(jobId).populate({
            path: "applicants",
            select: "name email phone profile.resume",
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.createdBy.toString() !== currentUserId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        res.status(200).json({
            success: true,
            applicants: job.applicants,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const savedJobs = await Job.find({ _id: { $in: user.savedJobs } });

        res.status(200).json({
            success: true,
            savedJobs,
        });
    } catch (error) {
        console.error("Error fetching saved jobs:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


