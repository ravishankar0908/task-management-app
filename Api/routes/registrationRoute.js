import express from "express";
import { postUsers } from "../controllers/registerationController.js";

const router = express.Router();

// to insert user details in the Database.
router.post("/", postUsers);

export default router;
