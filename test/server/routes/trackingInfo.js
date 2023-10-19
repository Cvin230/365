import express from "express";
import {
  createTracking,
  getTracking,
  getSingleTracking,
  deleteTracking,
  updateTracking,
  getUser
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

// Add the authentication route
router.post('/login', getUser);
export default router;
