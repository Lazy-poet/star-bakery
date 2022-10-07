import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../User/user.schema";
import response from "../utils/response";


async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = <any>(
        jwt.verify(token, process.env.JWT_SECRET_KEY as string)
      );
      const user = await UserModel.findOne({_id: decoded.id});
      if (!user) {
        return response.setError(res, 400, "Authentication failed")
      }
      req.user = user;
console.log('req user', req.user)
      return next();
    } catch (error) {
      console.error(error);
      return response.setError(res, 401, "Token has expired, please login again");
    }
  } else {
    return response.setError(res, 400, "Invalid token or token is missing");
  }
}
export default verifyToken;