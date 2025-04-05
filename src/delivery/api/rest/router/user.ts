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
import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";

class UserRouter {
  private router: Router;

  constructor(factory: RepositoryFactory) {
    this.router = Router();

    const verifyToken = new VerifyTokenController(false, factory);
    const login = new LoginController(factory);
    const create = new CreateUserController(factory);
    const get = new GetUserController(factory);
    const _delete = new DeleteUserController(factory);
    const update = new UpdateUserController(factory);

    this.router.post("/login", login.execute.bind(login));

    this.router.get("/token", verifyToken.execute.bind(verifyToken));

    this.router.post("/users", create.execute.bind(create));
    this.router.get("/users/:id", get.execute.bind(get));
    this.router.delete(
      "/users/:id",
      verifyTokenMiddleware(factory),
      _delete.execute.bind(_delete),
    );
    this.router.put(
      "/users/:id",
      verifyTokenMiddleware(factory),
      update.execute.bind(update),
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { UserRouter };
