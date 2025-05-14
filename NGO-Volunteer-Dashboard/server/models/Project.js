import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project title is required"],
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export const Project = mongoose.model("Project", projectSchema);
