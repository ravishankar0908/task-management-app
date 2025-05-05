import mongoose from "mongoose";
import userCollection from "../models/registrationModel.js";
import teamMemberCollection from "../models/teamMemberModel.js";
import taskCollection from "../models/taskModel.js";
import { messages } from "../utils/constant.js";
export const getManager = async (req, res) => {
  try {
    const getManager = await userCollection.find({
      role: "manager",
      isDelete: false,
    });

    if (getManager.length === 0) {
      return res.status(404).json({
        message: "No users Found in the Manager role",
      });
    }

    return res.status(200).json({
      message: "list of users with Manager role",
      ManagerDetails: getManager,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const pushEmployee = async (req, res) => {
  try {
    const { managerId, employeeId } = req.query;

    // checking the given employee id is already in a other team
    const check = await teamMemberCollection.findOne({
      employeeId: new mongoose.Types.ObjectId(employeeId),
    });

    if (check) {
      return res.status(409).json({
        message: "this is employee is already in the team",
      });
    }

    const teamMember = await teamMemberCollection.findOneAndUpdate(
      {
        managerId: new mongoose.Types.ObjectId(managerId),
      },
      {
        $push: { employeeId: new mongoose.Types.ObjectId(employeeId) },
      }
    );

    if (!teamMember) {
      return res.status(400).json({
        message: "Cannot push Employee or manager not found",
      });
    }

    return res.status(200).json({
      message: "pushed Employee successfully",
      details: teamMember,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getMyTeam = async (req, res) => {
  try {
    const { managerId } = req.query;

    const teamMembers = await teamMemberCollection.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "managerId",
          foreignField: "_id",
          as: "managerDetail",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "employeeId",
          foreignField: "_id",
          as: "employeeDetail",
        },
      },

      {
        $match: {
          "managerDetail._id": new mongoose.Types.ObjectId(managerId),
        },
      },
    ]);

    if (teamMembers.length === 0) {
      return res.status(400).json({
        message: "Not found",
      });
    }

    return res.status(200).json({
      message: "Teams and their manager",
      details: teamMembers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getMyTask = async (req, res) => {
  try {
    const { managerId } = req.query;

    const taskDetails = await taskCollection
      .find({
        managerId: new mongoose.Types.ObjectId(managerId),
        isDelete: false,
      })
      .populate("employeeId");

    if (taskDetails.length === 0) {
      return res.status(400).json({
        message: "You have not posted any task yet.",
      });
    }
    return res.status(200).json({
      message: "My task details",
      details: taskDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// de promote manager
export const dePromoteManager = async (req, res) => {
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
      });
    }

    const findManager = await teamMemberCollection.findOne({
      managerId: new mongoose.Types.ObjectId(userId),
    });

    if (!findManager) {
      return res.status(400).json({
        message: messages.notFound,
      });
    }

    const id = findManager._id;

    const deleteManager = await teamMemberCollection.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!deleteManager) {
      return res.status(400).json({
        message: messages.notDeleted,
      });
    }

    return res.status(200).json({
      message: messages.updated,
      employeeDetails: deleteManager,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
