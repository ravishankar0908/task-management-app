import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    managerId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },

    employeeId: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
    },
  },
  { timestamps: true }
);

const teamMemberCollection = mongoose.model("team-member", teamMemberSchema);
export default teamMemberCollection;
