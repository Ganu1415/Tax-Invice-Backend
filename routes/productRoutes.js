import express from "express";
import {
  createProduct,
  getProductsByCompany,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { protectAdmin } from "../middleware/authMiddleware.js"; // JWT + admin check middleware

const router = express.Router();

// Routes
router.post("/", protectAdmin, createProduct); // Create Product
router.get("/", protectAdmin, getAllProducts); // ✅ Get All Products (NEW)
router.get("/:companyId", protectAdmin, getProductsByCompany); // Get Products by Company
router.put("/:id", protectAdmin, updateProduct); // Update Product
router.delete("/:id", protectAdmin, deleteProduct); // Delete Product

export default router;
