import { Router } from "express";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import {
  CreateChecklistController,
  DeleteChecklistController,
  GetChecklistController,
  ListChecklistsBySystemIdController,
  ListChecklistsByUserIdController,
  UpdateChecklistController,
} from "../controller/checklist";

class ChecklistRouter {
  private router: Router;

  constructor() {
    this.router = Router();

    this.router.post(
      "/checklists",
      verifyTokenMiddleware,
      new CreateChecklistController().execute,
    );
    this.router.get(
      "/checklists/:id",
      verifyTokenMiddleware,
      new GetChecklistController().execute,
    );
    this.router.get(
      "/checklistsByUserId/:userId",
      verifyTokenMiddleware,
      new ListChecklistsByUserIdController().execute,
    );
    this.router.get(
      "/checklistsBySystemId/:systemId",
      verifyTokenMiddleware,
      new ListChecklistsBySystemIdController().execute,
    );
    this.router.delete(
      "/checklists/:id",
      verifyTokenMiddleware,
      new DeleteChecklistController().execute,
    );
    this.router.put(
      "/checklists/:id",
      verifyTokenMiddleware,
      new UpdateChecklistController().execute,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { ChecklistRouter };
