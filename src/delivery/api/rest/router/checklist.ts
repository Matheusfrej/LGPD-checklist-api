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
      new CreateChecklistController().createChecklist,
    );
    this.router.get(
      "/checklists/:id",
      verifyTokenMiddleware,
      new GetChecklistController().getChecklist,
    );
    this.router.get(
      "/checklistsByUserId/:userId",
      verifyTokenMiddleware,
      new ListChecklistsByUserIdController().listChecklistsByUserId,
    );
    this.router.get(
      "/checklistsBySystemId/:systemId",
      verifyTokenMiddleware,
      new ListChecklistsBySystemIdController().listChecklistsBySystemId,
    );
    this.router.delete(
      "/checklists/:id",
      verifyTokenMiddleware,
      new DeleteChecklistController().deleteChecklist,
    );
    this.router.put(
      "/checklists/:id",
      verifyTokenMiddleware,
      new UpdateChecklistController().updateChecklist,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { ChecklistRouter };
