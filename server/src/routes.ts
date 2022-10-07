import { Router, Response } from "express";
import UserRoutes from "./User/user.route";
import ItemRoutes from "./Item/item.route";
import OrderRoutes from "./Order/order.route";
import BranchRoutes from "./Branch/branch.route"
class Routes {
  public readonly router: Router;
  constructor() {
    this.router = Router();
    this.initApplicationRoutes();
  }

  private initApplicationRoutes = () => {
    this.router.get("/", (_, res: Response) => {
      res.send("Welcome to Star Bakery server");
    });

    this.router.use("/auth", UserRoutes.router);
    this.router.use("/items",ItemRoutes.router);
    this.router.use("/orders", OrderRoutes.router);
    this.router.use("/branch", BranchRoutes.router);
  };
}

export default new Routes().router;
