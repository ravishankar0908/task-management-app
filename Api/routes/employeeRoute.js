import express from "express";
import {
  getEmployee,
  getTask,
  getManager,
  updateTaskStatus,
  deleteEmployee,
  promoteToManager,
} from "../controllers/employeeController.js";
const router = express.Router();

// get employee details
router.get("/", getEmployee);

// get task for the employee
router.get("/my-task", getTask);

// get my manager details
router.get("/my-manager", getManager);

// update Task status to complete
router.patch("/task", updateTaskStatus);

// delete employee
router.delete("/delete", deleteEmployee);

// promote employee to manager
router.patch("/promote", promoteToManager);

export default router;
