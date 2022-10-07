import { Request, Response } from "express";
import validateItemData from "../validations/item.validation";
import ItemModel from "./item.schema";
import { ValidationError, catchAsyncError } from "../utils/error";

import response from "../utils/response";
export default new (class ItemController {
  createItem = catchAsyncError(async (req: Request, res: Response) => {
    const error = validateItemData(req.body);
    if (error) {
      throw new ValidationError(error);
    }
    const item = await ItemModel.create(req.body);
    if (item) {
      return response.setSuccess(res, 201, "success", item);
    } else {
      response.setError(res, 500, "an error occurred");
    }
  });

  
})();
