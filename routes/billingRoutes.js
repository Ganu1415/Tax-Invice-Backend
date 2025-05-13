import express from "express";
import {
  createBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
} from "../controllers/billingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", protect, createBill); // Create Bill
router.get("/", protect, getAllBills); // Get all Bills
router.get("/:id", protect, getBillById); // Get Single Bill
router.put("/:id", protect, updateBill); // Update Bill
router.delete("/:id", protect, deleteBill); // Delete Bill

export default router;
