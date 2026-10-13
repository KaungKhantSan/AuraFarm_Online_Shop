import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cooki_parser from "cookie-parser";
import { DBconnect } from "./db/DBconnect";
import UserRoute from "./routes/User";
import ProductRoute from "./routes/Product";
import ErrorHandler from "./middlewares/ErrorHandler";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(json());
app.use(cooki_parser());

//routes
app.use("/api", UserRoute);
app.use("/api", ProductRoute);

app.use(ErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  //DB connection
  DBconnect();
  console.log("Server is ruuning on", PORT);
});
