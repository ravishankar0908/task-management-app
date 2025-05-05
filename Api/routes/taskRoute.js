import express from "express";
import {
  approveTaskbyManager,
  deleteTask,
  getTask,
  getTaskById,
  postTask,
  restoreTask,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

// insert task into database
router.post("/", postTask);
// get all the task details
router.get("/all-tasks", getTask);
// get task by Id
router.get("/byid", getTaskById);

// delete task by id
router.delete("/delete", deleteTask);

// restore the deleted task
router.patch("/restore", restoreTask);

// update the task
router.put("/update", updateTask);

// update task status
router.patch("/update-status", updateTaskStatus);

// approve task by manager
router.patch("/manager-approve", approveTaskbyManager);

export default router;
