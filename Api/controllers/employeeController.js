import mongoose from "mongoose";
import userCollection from "../models/registrationModel.js";
import taskCollection from "../models/taskModel.js";
import teamMemberCollection from "../models/teamMemberModel.js";
import { messages } from "../utils/constant.js";
export const getEmployee = async (req, res) => {
  try {
    const getEmployee = await userCollection.find({
      role: "employee",
      isDelete: false,
    });

    if (getEmployee.length === 0) {
      return res.status(404).json({
        message: "No users Found in the employee role",
      });
    }

    return res.status(200).json({
      message: "list of users with employee role",
      employeeDetails: getEmployee,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const { employeeId } = req.query;
    const task = await taskCollection.find({
      employeeId: { $in: employeeId },
      isDelete: false,
    });

    if (task.length === 0) {
      return res.status(400).json({
        message: "no task is available for you right now contact your manager",
      });
    }

    return res.status(200).json({
      message: "my task",
      details: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getManager = async (req, res) => {
  try {
    const { employeeId } = req.query;
    const manager = await teamMemberCollection.findOne({
      employeeId: { $in: employeeId },
    });

    if (!manager) {
      return res.status(400).json({
        message: "You have No manager assigned",
      });
    }

    const managerId = manager.managerId;

    const managerDetail = await teamMemberCollection.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "managerId",
          foreignField: "_id",
          as: "managerDetail",
        },
      },
      {
        $unwind: "$managerDetail",
      },
      {
        $match: {
          managerId: managerId,
        },
      },
    ]);

    if (!managerDetail) {
      return res.status(400).json({
        message: "Manager Detail not found",
      });
    }

    return res.status(200).json({
      message: "my manager",
      managerdetail: managerDetail,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// update task status to complete

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { status } = req.body;

    const taskDetail = await taskCollection.findOneAndUpdate(
      { _id: taskId },
      { $set: { status: status } }
    );

    if (!taskDetail) {
      return res.status(400).json({
        message: "Task is not updated",
      });
    }

    return res.status(200).json({
      message: "Task is updated",
      task: taskDetail,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { userId } = req.query;

    const deleteUser = await userCollection.findByIdAndUpdate(
      { _id: userId },
      { $set: { isDelete: true } }
    );

    if (!deleteUser) {
      return res.status(400).json({
        message: messages.notDeleted,
      });
    }
    return res.status(200).json({
      message: messages.deleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
    });
  }
};

// promote employee to manager
export const promoteToManager = async (req, res) => {
  try {
    const { userId } = req.query;
    const { role } = req.body;

    const employee = await userCollection.findByIdAndUpdate(
      { _id: userId },
      { $set: { role: role } },
      { new: true }
    );

    if (!employee) {
      return res.status(400).json({
        message: messages.notUpdated,
        employeeDetails: employee,
      });
    }

    const pushManager = new teamMemberCollection({
      managerId: new mongoose.Types.ObjectId(userId),
    });

    const saved = pushManager.save();

    if (!saved) {
      return res.status(400).json({
        message: messages.notCreated,
      });
    }

    return res.status(200).json({
      message: messages.updated,
      employeeDetails: employee,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
    });
  }
};
