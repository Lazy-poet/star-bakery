import { Order } from "../types";
import OrderModel from "./order.schema";
export class OrderService {
  async create(data: Order) {
    const order = await OrderModel.create(data);
    return order;
  }

  async update(_id: string, data: Partial<Order>) {
    const order = await OrderModel.findOneAndUpdate(
      { _id },
      { $set: { ...data } },
      { new: true }
    );
    return order;
  }

  async getAll() {
    const orders = await OrderModel.find();
    return orders;
  }
  async findById(_id: string) {
    const order = await OrderModel.findOne({ _id });
    return order;
  }
}
