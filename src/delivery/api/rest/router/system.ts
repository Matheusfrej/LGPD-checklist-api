import { Router } from "express";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import {
  CreateSystemController,
  DeleteSystemController,
  GetSystemController,
  ListSystemsByUserIdController,
  UpdateSystemController,
} from "../controller/system";

class SystemRouter {
  private router: Router;

  constructor() {
    this.router = Router();

    this.router.post(
      "/systems",
      verifyTokenMiddleware,
      new CreateSystemController().execute,
    );
    this.router.get("/systems/:id", new GetSystemController().execute);
    this.router.get(
      "/systemsByUserId/:userId",
      verifyTokenMiddleware,
      new ListSystemsByUserIdController().execute,
    );
    this.router.delete(
      "/systems/:id",
      verifyTokenMiddleware,
      new DeleteSystemController().execute,
    );
    this.router.put(
      "/systems/:id",
      verifyTokenMiddleware,
      new UpdateSystemController().execute,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { SystemRouter };
