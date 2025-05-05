import express from "express";
import {
  getManager,
  getMyTeam,
  pushEmployee,
  getMyTask,
  dePromoteManager,
} from "../controllers/managerController.js";
const router = express.Router();

// Get manager details only.
router.get("/", getManager);

// push employee into the employeeId array in the team-members collection
router.put("/push-employee", pushEmployee);

// get my team members
router.get("/my-team", getMyTeam);

// to see my task details
router.get("/my-task", getMyTask);

// de promote manager
router.patch("/de-promote", dePromoteManager);

export default router;
