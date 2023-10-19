import express from "express";
import {
  createTracking,
  getTracking,
  getSingleTracking,
  deleteTracking,
  updateTracking,
} from "../controllers/trackingController.js";

const router = express.Router();

//GET all tracking
router.get("/", getTracking);

//GET  a single tracking
router.get("/:tn", getSingleTracking);

//POST a new tracking
router.post("/", createTracking);

//DELETE a tracking
router.delete("/:id", deleteTracking);

//UPDATE a tracking info
router.patch("/:id", updateTracking);
export default router;
