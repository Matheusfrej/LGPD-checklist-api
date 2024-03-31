import { Router } from "express";
import {
  CreateUserController,
  DeleteUserController,
  GetUserController,
  LoginController,
  UpdateUserController,
  VerifyTokenController,
} from "../controller/user";

class UserRouter {
  private router: Router;

  constructor() {
    this.router = Router();

    const verifyTokenMiddleware = ((instance) =>
      instance.verifyToken.bind(instance))(new VerifyTokenController(true));
    const verifyToken = ((instance) => instance.verifyToken.bind(instance))(
      new VerifyTokenController(false),
    );

    this.router.post("/users", new CreateUserController().createUser);
    this.router.get("/users/:id", new GetUserController().getUser);
    this.router.delete(
      "/users/:id",
      verifyTokenMiddleware,
      new DeleteUserController().deleteUser,
    );
    this.router.post("/login", new LoginController().login);
    this.router.get("/token", verifyToken);
    this.router.put(
      "/users/:id",
      verifyTokenMiddleware,
      new UpdateUserController().updateUser,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { UserRouter };
