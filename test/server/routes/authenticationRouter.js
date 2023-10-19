import express from "express";
import { getUser } from "../controllers/trackingController.js";

const router = express.Router();

// Add the authentication route
router.post('/login', getUser);

export default router;
