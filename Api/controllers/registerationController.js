import bcrypt from "bcrypt";
import { messages } from "../utils/constant.js";
import userCollection from "../models/registrationModel.js";
import teamMemberCollection from "../models/teamMemberModel.js";

export const postUsers = async (req, res) => {
  try {
    const { firstName, lastName, gender, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (!firstName || !lastName || !gender || !email || !password) {
      return res.status(400).json({
        message: messages.notEmpty,
      });
    }

    const checkEmail = await userCollection.findOne({ email: email });

    if (checkEmail) {
      return res.status(200).json({
        message: messages.exist,
      });
    }

    const registerUser = await userCollection.create({
      firstName,
      lastName,
      gender,
      email,
      password: hashPassword,
    });

    if (!registerUser) {
      return res.status(400).json({
        message: messages.notCreated,
      });
    }

    return res.status(200).json({
      message: messages.inserted,
      userDetail: registerUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
    });
  }
};
