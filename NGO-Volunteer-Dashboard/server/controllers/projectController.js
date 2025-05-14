import { Project } from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const { title, description, location, startDate, endDate } = req.body;
        const userId = req.user.id;

        const project = await Project.create({
            title,
            description,
            location,
            startDate,
            endDate,
            postedBy: userId,
        });

        res.status(201).json({
            success: true,
            message: "Project posted successfully",
            project,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to post project", error });
    }
};

// GET /api/projects/public
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("postedBy", "name email phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            projects,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching projects", error });
    }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        if (project.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this project" });
        }

        await project.deleteOne();

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete project", error });
    }
};
