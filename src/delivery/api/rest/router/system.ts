import { Router } from "express";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import {
  CreateSystemController,
  DeleteSystemController,
  GetSystemController,
  ListSystemsByUserIdController,
  UpdateSystemController,
} from "../controller/system";
import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";

class SystemRouter {
  private router: Router;

  constructor(factory: RepositoryFactory) {
    this.router = Router();

    const create = new CreateSystemController(factory);
    const get = new GetSystemController(factory);
    const listByUser = new ListSystemsByUserIdController(factory);
    const _delete = new DeleteSystemController(factory);
    const update = new UpdateSystemController(factory);

    this.router.post(
      "/systems",
      verifyTokenMiddleware(factory),
      create.execute.bind(create),
    );
    this.router.get("/systems/:id", get.execute.bind(get));
    this.router.get(
      "/systemsByUserId/:userId",
      verifyTokenMiddleware(factory),
      listByUser.execute.bind(listByUser),
    );
    this.router.delete(
      "/systems/:id",
      verifyTokenMiddleware(factory),
      _delete.execute.bind(_delete),
    );
    this.router.put(
      "/systems/:id",
      verifyTokenMiddleware(factory),
      update.execute.bind(update),
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { SystemRouter };
