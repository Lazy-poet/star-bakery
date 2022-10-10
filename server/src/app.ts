import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import StatusCodes from "http-status-codes";
import response from "./utils/response";
import routes from "./routes";
const app = express();
import { CustomError } from "./utils/error";
import connectDB from './database/mongoConnect'
import { connectTestDB } from "./database/mongoMemoryConnect"
import path from 'path'
// app.use(compression());
dotenv.config()
if (process.env.NODE_ENV === "test") {
  connectTestDB();
} else {
  connectDB();
}
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

app.use("/api/star-bakery/v1", routes);
app.use("/", express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
})
// catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError(404));
});
// Error handling
app.use(
  (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    // logger.err(err, true);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    console.log(err);
    return response.setError(res, status, err.message);
  }
);

export default app;
