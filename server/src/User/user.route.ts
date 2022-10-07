import { Router } from "express";
import UserController from "./user.controller";
export default new (class UserRoutes {
  public readonly router: Router;
  constructor() {
    this.router = Router();
    this.initRoute();
  }

  private initRoute = () => {
    this.router.post("/signup", UserController.register);
    this.router.post('/login', UserController.login)
  };
})();
