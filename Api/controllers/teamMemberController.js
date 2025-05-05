import userCollection from "../models/registrationModel.js";
import teamMemberCollection from "../models/teamMemberModel.js";

export const getTeamMember = (req, res) => {
  try {
    return res.json({
      message: "ok",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
