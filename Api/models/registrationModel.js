import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required."],
    },
    lastName: {
      type: String,
      required: [true, "last name is required."],
    },
    gender: {
      type: String,
      required: [true, "gender is required."],
    },
    role: {
      type: String,
      required: [true, "role is required."],
      default: "employee",
    },
    email: {
      type: String,
      required: [true, "email is required."],
      unique: [
        true,
        "this email is already exist in the database, try different one",
      ],
    },
    password: {
      type: String,
      required: [true, "password is required."],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userCollection = mongoose.model("user", registerSchema);
export default userCollection;
