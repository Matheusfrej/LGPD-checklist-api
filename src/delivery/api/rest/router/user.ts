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
    const verifyToken = verifyTokenBind.execute.bind(verifyTokenBind);

    this.router.post("/login", new LoginController().execute);

    this.router.get("/token", verifyToken);

    this.router.post("/users", new CreateUserController().execute);
    this.router.get("/users/:id", new GetUserController().execute);
    this.router.delete(
      "/users/:id",
      verifyTokenMiddleware,
      new DeleteUserController().execute,
    );
    this.router.put(
      "/users/:id",
      verifyTokenMiddleware,
      new UpdateUserController().execute,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { UserRouter };
