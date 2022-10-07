import { Router } from "express";
import ItemController from "./item.controller";
export default new (class ItemRoutes {
  public readonly router: Router;
  constructor() {
    this.router = Router();
    this.initRoute();
  }

  private initRoute = () => {
    this.router.post("/create", ItemController.createItem);
  };
})();
