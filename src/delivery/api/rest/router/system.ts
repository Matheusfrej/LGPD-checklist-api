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
      new CreateSystemController().createSystem,
    );
    this.router.get("/systems/:id", new GetSystemController().getSystem);
    this.router.get(
      "/systemsByUserId/:userId",
      verifyTokenMiddleware,
      new ListSystemsByUserIdController().listSystemsByUserId,
    );
    this.router.delete(
      "/systems/:id",
      verifyTokenMiddleware,
      new DeleteSystemController().deleteSystem,
    );
    this.router.put(
      "/systems/:id",
      verifyTokenMiddleware,
      new UpdateSystemController().updateSystem,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { SystemRouter };
