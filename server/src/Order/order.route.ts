import { Router } from "express";
import OrderController from "./order.controller";
import AuthMiddleware from "../middlewares/auth";

export default new (class OrderRoutes {
  public readonly router: Router;
  constructor() {
    this.router = Router();
    this.initRoute();
  }

  private initRoute = () => {
    this.router.get("/", OrderController.getOrders);
    this.router.post("/create", AuthMiddleware, OrderController.createOrder);
    this.router.put("/update/:id", AuthMiddleware, OrderController.updateOrder);
  };
})();
