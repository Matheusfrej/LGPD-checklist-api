import { Router } from "express";
import {
  CreateUserController,
  LoginController,
  UpdateUserController,
  VerifyTokenController,
} from "../controller/user";

class UserRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    const verifyTokenMiddleware = new VerifyTokenController(true);
    const verifyToken = new VerifyTokenController(false);

    this.router.post("/users", new CreateUserController().createUser);
    this.router.post("/login", new LoginController().login);
    this.router.get("/token", verifyToken.verifyToken.bind(verifyToken));
    this.router.put(
      "/users/:id",
      verifyTokenMiddleware.verifyToken.bind(verifyTokenMiddleware),
      new UpdateUserController().updateUser,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { UserRouter };
