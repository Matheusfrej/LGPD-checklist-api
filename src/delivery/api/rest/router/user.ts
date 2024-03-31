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

    this.router.post("/login", new LoginController().login);

    this.router.get(
      "/token",
      ((instance) => instance.verifyToken.bind(instance))(
        new VerifyTokenController(false),
      ),
    );

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
