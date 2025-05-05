import bcrypt from "bcrypt";
import userCollection from "../models/registrationModel.js";
import jwt from "jsonwebtoken";
import { mail } from "../utils/mailTransporter.js";
import { messages } from "../utils/constant.js";
import mongoose from "mongoose";

export const authUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const auth = await userCollection.findOne({
      email: email,
      isDelete: false,
    });
    if (!auth) {
      return res.status(404).json({
        message: messages.notFound,
        success: false,
      });
    }

    const comparePassword = await bcrypt.compare(password, auth.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: messages.passwordInvalid,
        success: false,
      });
    }

    const payload = {
      userId: auth._id,
      userRole: auth.role,
      email: auth.email,
      firstName: auth.firstName,
      lastName: auth.lastName,
      gender: auth.gender,
    };

    const token = jwt.sign(payload, process.env.JWT_TOKEN);

    return res.status(200).json({
      message: messages.loginSuccess,
      userRole: auth.role,
      token: token,
      userDetail: auth,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
      success: false,
    });
  }
};

// change password / forgot-password
export const updatePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const subject = "Password Reset Mail";
    const mes =
      "Password reset mail has been sent to your mail and it is only valid for 10 minutes only.";

    const isExist = await userCollection.findOne({ email: email });

    if (!isExist) {
      return res.status(404).json({
        message: messages.emailNotSent,
      });
    }
    const payload = {
      email: isExist.email,
    };
    const passwordToken = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: "10m",
    });

    const text = `${mes}\n\n${req.protocol}://localhost:4200/auth/reset-password/${passwordToken}`;

    const sendMail = mail({ email, subject, text });

    return res.status(200).json({
      message: messages.emailSent,
      token: passwordToken,
      link: text,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
    });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newpass } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newpass, salt);
    const verify = jwt.verify(token, process.env.JWT_TOKEN);

    if (!verify) {
      return res.status(400).json({
        messages: "Invalid token",
      });
    }

    const email = verify.email;

    const isUser = await userCollection.findOneAndUpdate(
      { email: email },
      { $set: { password: hashPassword } }
    );

    if (!isUser) {
      return res.status(404).json({
        message: messages.notFound,
      });
    }

    return res.status(200).json({
      message: "Password has been updated",
      tokenid: token,
      userDetails: isUser,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(498).json({
        message: "Token is expired",
      });
    }
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
      return res.status(400).json({
        message: messages.cannotSame,
      });
    }

    const isUser = await userCollection.findById(
      new mongoose.Types.ObjectId(userId)
    );

    if (!isUser) {
      return res.status(404).json({
        message: messages.notFound,
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, isUser.password);

    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: messages.incorrectPassword,  
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    const updatePassword = await userCollection.updateOne(
      { _id: userId },
      { $set: { password: hashedNewPassword } }
    );

    if (!updatePassword) {
      return res.status(400).json({
        message: messages.notUpdated,
      });
    }

    return res.status(200).json({
      message: messages.updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: messages.serverError,
      error: error.message,
    });
  }
};
