import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    message: {
      type: String,
    },
    isManagerApproved:{
      type: Boolean,
      default: false
    },
    managerId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    isDelete: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

const taskCollection = mongoose.model("task", taskSchema);

export default taskCollection;
