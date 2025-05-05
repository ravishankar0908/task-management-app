import express from "express";
import mongoose from "mongoose";
import registrationRouter from "./routes/registrationRoute.js";
import authRouter from "./routes/authRoute.js";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import employeeRouter from "./routes/employeeRoute.js";
import managerRouter from "./routes/managerRoute.js";
import teamMemberRouter from "./routes/teamMemberRoute.js";
import adminRouter from "./routes/adminRoute.js";
import taskRouter from "./routes/taskRoute.js";
import { messages } from "./utils/constant.js";
import userCollection from "./models/registrationModel.js";
import logger from "./logger.js";
import morgan from "morgan";
import { mail } from "./utils/mailTransporter.js";

const port = 3000;
const app = express();
// implementing logger
const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
// MiddleWares
app.use(cors());
configDotenv();
app.use(express.json());
app.use("/registration", registrationRouter);
app.use("/auth", authRouter);
app.use("/employee", employeeRouter);
app.use("/manager", managerRouter);
app.use("/team-member", teamMemberRouter);
app.use("/task", taskRouter);
app.use("/admin", adminRouter);

// server is listening and connection with mongoDB
try {
  app.listen(port, async () => {
    await mongoose.connect(process.env.DB_URI).then(() => {
      // inserting the default admin role user in the user collection
      defaultAdminUser();
    });

    console.log(
      `The server is connected with MongoDB and listening on http://localhost:${port}`
    );
  });
} catch (error) {
  console.log(error.message);
}

const defaultAdminUser = async () => {
  try {
    const password = process.env.admin_pass;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(password, salt);

    const checkAdminExist = await userCollection.findOne({
      email: "admin@gmail.com",
    });
    if (checkAdminExist) {
      return;
    }

    const adminUser = await userCollection.create({
      firstName: "Admin",
      lastName: "admin",
      gender: "male",
      role: "admin",
      email: "admin@gmail.com",
      password: hashPassword,
    });

    if (!adminUser) {
      console.log(messages.notCreated);
    }

    console.log(messages.inserted);
  } catch (error) {
    console.log(messages.serverError, error.message);
  }
};
