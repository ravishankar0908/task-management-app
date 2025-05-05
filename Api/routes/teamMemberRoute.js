import express from "express";
import { getTeamMember } from "../controllers/teamMemberController.js";

const router = express.Router();

router.get("/", getTeamMember);

export default router;
