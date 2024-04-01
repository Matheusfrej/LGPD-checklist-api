import { Router } from "express";
import {
  CreateUserController,
  DeleteUserController,
  GetUserController,
  LoginController,
  UpdateUserController,
  VerifyTokenController,
} from "../controller/user";
import { verifyTokenMiddleware } from "../middleware/verifyToken";

class UserRouter {
  private router: Router;

  constructor() {
    this.router = Router();

    const verifyTokenBind = new VerifyTokenController(false);
    const verifyToken = verifyTokenBind.verifyToken.bind(verifyTokenBind);

    this.router.post("/login", new LoginController().login);

    this.router.get("/token", verifyToken);

    this.router.post("/users", new CreateUserController().createUser);
    this.router.get("/users/:id", new GetUserController().getUser);
    this.router.delete(
      "/users/:id",
      verifyTokenMiddleware,
      new DeleteUserController().deleteUser,
    );
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
