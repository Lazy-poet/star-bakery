/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
import mongoose from "mongoose";
import Env from '../config/env.config'

const connectDB = () => {
  const url: string = Env.getValue('DATABASE_URL') as string;
  mongoose
    .connect(url )
    .then(() => {
      console.log("info", `Successfully connected to ${process.env.NODE_ENV} database`);
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};
export default connectDB;
