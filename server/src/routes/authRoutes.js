import express from "express";
import { register, login, getProfile, updateProfile } from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getProfile);
router.put("/me", auth, updateProfile);

export default router;
