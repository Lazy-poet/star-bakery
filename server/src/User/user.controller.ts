import { Request, Response } from "express";
import { UserService } from "./user.service";
import validateSignupData from "../validations/user.validation";
import { ValidationError, catchAsyncError } from "../utils/error";
import response from "../utils/response";
import { generateToken } from "../utils/generateToken";
export default new (class UserController {
  constructor(private readonly userService: UserService) {}
  register = catchAsyncError(async (req: Request, res: Response) => {
    const error = validateSignupData(req.body);
    if (error) {
      throw new ValidationError(error);
    }
    const user = await this.userService.createUser(req.body);
    user
      ? response.setSuccess(res, 201, "success", user)
      : response.setError(res, 400, "an error occured");
  });
  login = catchAsyncError(async (req: Request, res: Response) => {
    const error = validateSignupData(req.body);
    if (error) {
      throw new ValidationError(error);
    }
    const user = await this.userService.findUserByName(req.body.username);
    if (!user || !(await user.validatePassword(req.body.password))) {
      return response.setError(res, 400, "invalid credentials");
    }
    const token = generateToken(user._id);
    user.password = '';
    return response.setSuccess(res, 200, "success", { user, token });
  });
})(new UserService());
