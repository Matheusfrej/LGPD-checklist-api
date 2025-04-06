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
import { CustomRouter } from "./customRouter";

class UserRouter extends CustomRouter {
  constructor(factory: RepositoryFactory) {
    super();

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
}

export { UserRouter };
