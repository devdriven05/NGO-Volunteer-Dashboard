import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,          // ✅ Must provide name
        unique: true             // ✅ Enforces unique company name
    },
    description: {
        type: String             // ✅ Optional field
    },
    website: {
        type: String             // ✅ Optional field
    },
    location: {
        type: String             // ✅ Optional field
    },
    logo: {
        type: String             // ✅ Optional field for company logo URL or filename
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',             // ✅ Links company to a user
        required: true           // ✅ Ensures ownership
    }
}, { timestamps: true });     // ✅ Adds createdAt and updatedAt fields

export const Company = mongoose.model("Company", companySchema);
