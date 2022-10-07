import { Request, Response } from "express";
import { OrderService } from "./order.service";
import validateOrderData from "../validations/order.validation";
import {
  ValidationError,
  catchAsyncError,
  NotFoundError,
} from "../utils/error";
import ItemModel from "../Item/item.schema";
import BranchModel from "../Branch/branch.schema";
import response from "../utils/response";
export default new (class OrderController {
  constructor(private readonly orderService: OrderService) {}
  createOrder = catchAsyncError(async (req: Request, res: Response) => {
    const error = validateOrderData(req.body);
    if (error) {
      throw new ValidationError(error);
    }

    const item = await ItemModel.findOne({ name: req.body.order_item });
    const branch = await BranchModel.findOne({ _id: req.body.branch_id });
    if (!item || !branch) {
      throw new NotFoundError();
    }
    const data = {
      ...req.body,
      amount: item.amount,
      customer_id: req.user._id,
      state: "created",
    };
    const order = await this.orderService.create(data);
    if (order) {
      return response.setSuccess(res, 201, "success", order);
    }
  });

  updateOrder = catchAsyncError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await this.orderService.update(id, req.body);
    if (item) {
      return response.setSuccess(res, 200, "item updated", item);
    }
  });

  getOrders = catchAsyncError(async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    return response.setSuccess(res, 200, "success", orders)
  })
})(new OrderService());
