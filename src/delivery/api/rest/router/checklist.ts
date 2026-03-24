import { verifyTokenMiddleware } from "../middleware/verifyToken";
import {
  CreateChecklistController,
  DeleteChecklistController,
  GetChecklistController,
  ListChecklistsBySystemIdController,
  ListChecklistsByUserIdController,
  UpdateChecklistController,
} from "../controller/checklist";
import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";
import { CustomRouter } from "./customRouter";

class ChecklistRouter extends CustomRouter {
  constructor(factory: RepositoryFactory) {
    super();

    const create = new CreateChecklistController(factory);
    const get = new GetChecklistController(factory);
    const listByUser = new ListChecklistsByUserIdController(factory);
    const listBySystem = new ListChecklistsBySystemIdController(factory);
    const _delete = new DeleteChecklistController(factory);
    const update = new UpdateChecklistController(factory);

    this.router.post(
      "/checklists",
      verifyTokenMiddleware(factory),
      create.execute.bind(create),
    );
    this.router.get(
      "/checklists/:id",
      verifyTokenMiddleware(factory),
      get.execute.bind(get),
    );
    this.router.get(
      "/checklistsByUserId/:userId",
      verifyTokenMiddleware(factory),
      listByUser.execute.bind(listByUser),
    );
    this.router.get(
      "/checklistsBySystemId/:systemId",
      verifyTokenMiddleware(factory),
      listBySystem.execute.bind(listBySystem),
    );
    this.router.delete(
      "/checklists/:id",
      verifyTokenMiddleware(factory),
      _delete.execute.bind(_delete),
    );
    this.router.put(
      "/checklists/:id",
      verifyTokenMiddleware(factory),
      update.execute.bind(update),
    );
  }
}

export { ChecklistRouter };
