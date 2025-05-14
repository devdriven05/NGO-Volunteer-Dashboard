import express from "express";
import {
  applyJob,
  createJob,
  deleteJob,
  getJobApplicants,
  getJobById,
  getJobs,
  getJobsByUser,
  getSavedJobs,
  likeJob,
  searchJobs
} from "../controllers/JobController.js";

import {
  createProject,
  deleteProject // <-- Make sure this is exported in your projectController
  ,


  getAllProjects
} from "../controllers/projectController.js";

import {
  forgotPassword,
  getUser,
  getUserProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  verifyOTP
} from "../controllers/userController.js";

import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../utils/multer.js";

const router = express.Router();

// User Routes
router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/user/:id", isAuthenticated, getUserProfile);

// Job Routes
router.post("/Jobs", isAuthenticated, createJob);
router.get("/Jobs", getJobs);
router.get("/Jobs/user/:id", isAuthenticated, getJobsByUser);
router.get("/Jobs/search", searchJobs);
router.put("/Jobs/apply/:id", isAuthenticated, applyJob);
router.put("/Jobs/like/:id", isAuthenticated, likeJob);
router.get("/Jobs/:id", isAuthenticated, getJobById);
router.delete("/Jobs/:id", isAuthenticated, deleteJob);
router.get("/job/:id/applicants", isAuthenticated, getJobApplicants);
router.post("/update/profile", isAuthenticated, singleUpload, updateProfile);
router.get("/saved-jobs", isAuthenticated, getSavedJobs);

// Project Routes
router.post("/projects", isAuthenticated, createProject);
router.get("/projects/public", getAllProjects);
router.delete("/projects/:id", isAuthenticated, deleteProject);

export default router;
