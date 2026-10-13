import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});
export const DBconnect = async () => {
  try {
    let DBconnectionString = "";

    if (process.env.NODE_ENV === "development") {
      DBconnectionString = process.env.MONGO_LOCAL_URI!;
    }

    if (process.env.NODE_ENV === "production") {
      DBconnectionString = process.env.MONGO_URI!;
    }

    const response = await mongoose.connect(DBconnectionString);

    console.log("Data Base Connected.", response.connection.host);
  } catch (error) {
    console.log("Data connection Falied", error);
    process.exit(1);
  }
};
