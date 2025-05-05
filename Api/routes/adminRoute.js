import express from "express";
import {
  getAllDeletedUser,
  getGenderCount,
  getUserRoleCount,
  resetUser,
} from "../controllers/adminController.js";

const router = express.Router();

// get all the deleted users
router.get("/deleted-user", getAllDeletedUser);

// reset the deleted user
router.patch("/reset-user", resetUser);

// get gender count
router.get("/gender-count", getGenderCount);

// get gender count
router.get("/user-role-count", getUserRoleCount);

export default router;
