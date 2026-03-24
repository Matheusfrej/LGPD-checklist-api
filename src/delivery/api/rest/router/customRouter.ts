import { Router } from "express";

export abstract class CustomRouter {
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  getRouter(): Router {
    return this.router;
  }
}
