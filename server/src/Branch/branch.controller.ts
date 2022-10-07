import { Request, Response } from "express";
import validateItemData from "../validations/branch.validation";
import BranchModel from "./branch.schema";
import OrderModel from "../Order/order.schema";
import { ValidationError, catchAsyncError } from "../utils/error";

import response from "../utils/response";
export default new (class BranchController {
  createBranch = catchAsyncError(async (req: Request, res: Response) => {
    const error = validateItemData(req.body);
    if (error) {
      throw new ValidationError(error);
    }
    const item = await BranchModel.create(req.body);
    if (item) {
      return response.setSuccess(res, 201, "success", item);
    } else {
      response.setError(res, 500, "an error occurred");
    }
  });

  getBranches = catchAsyncError(async (_req: Request, res: Response) => {
    const branches = await BranchModel.find();
    const result = await Promise.all(
      branches.map(async (branch) => {
        const orders = await OrderModel.find({branch_id: branch._id});
        return {...branch.toObject(), orders: orders?.length || 0};
      })
    );
    return response.setSuccess(res, 201, "success", result);
  });
})();
