import express from "express";
import {
  createItem,
  getAllItemsByProduct,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes
router.post("/", protectAdmin, createItem); // admin create
router.get("/:productId", protectAdmin, getAllItemsByProduct); // admin read
router.put("/:id", protectAdmin, updateItem); // admin update
router.delete("/:id", protectAdmin, deleteItem); // admin delete

export default router;
