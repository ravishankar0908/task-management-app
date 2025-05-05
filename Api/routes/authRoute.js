import express from "express";
import {
  authUsers,
  changePassword,
  resetPassword,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

// authenticate the user login
router.post("/", authUsers);

// update password
router.post("/forgot-password", updatePassword);

// reset password
router.patch("/reset-password/:token", resetPassword);

// change Password
router.patch("/change-password", changePassword);

export default router;
