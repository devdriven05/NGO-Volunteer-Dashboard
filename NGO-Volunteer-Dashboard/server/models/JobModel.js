import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: "Remote",
    },
    description: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
    }],
    skills: [
        {
            type: String,
            required: true,
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    applicantsCount: { type: Number, default: 0 },
    jobType: [
        {
            type: String,
            required: true,
        },
    ],
}, { timestamps: true });

const Job = mongoose.model("Job", JobSchema);
export default Job;
