import express from "express";
import {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController.js";
import { protectAdmin } from "../middleware/authMiddleware.js"; // JWT + admin check middleware

const router = express.Router();

// Routes
router.post("/", protectAdmin, createCompany); // admin create
router.get("/", protectAdmin, getAllCompanies); // admin read
router.put("/:id", protectAdmin, updateCompany); // admin update
router.delete("/:id", protectAdmin, deleteCompany); // admin delete

export default router;
