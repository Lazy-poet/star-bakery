import { Router } from "express";
import BranchController from "./branch.controller";
export default new (class BranchRoutes {
  public readonly router: Router;
  constructor() {
    this.router = Router();
    this.initRoute();
  }

  private initRoute = () => {
    this.router.get("/", BranchController.getBranches);
    this.router.post("/create", BranchController.createBranch);
  };
})();
