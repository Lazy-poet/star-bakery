import jwt from 'jsonwebtoken'
import Env from '../config/env.config'
import {Types} from 'mongoose'
export const generateToken = function (
    userId: Types.ObjectId,
  ): string {
    return jwt.sign({ id: userId }, Env.getValue('JWT_SECRET_KEY') as string, {
      expiresIn: "7d",
    });
  };