import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

// Load environment variables from config.env
config({ path: "config.env" });

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export default cloudinary;
