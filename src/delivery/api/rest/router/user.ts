import { Router } from "express";
import { CreateUserController } from "../controller/user";

class UserRouter {
  private router: Router;

  constructor() {
    this.router = Router();

    this.router.post("/users", new CreateUserController().createUser);
  }

  getRouter(): Router {
    return this.router;
  }
}

export { UserRouter };
