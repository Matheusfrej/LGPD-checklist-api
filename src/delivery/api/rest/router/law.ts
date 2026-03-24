import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";
import { ListLawsController } from "../controller/law";
import { CustomRouter } from "./customRouter";

export class LawRouter extends CustomRouter {
  constructor(factory: RepositoryFactory) {
    super();

    const list = new ListLawsController(factory);

    this.router.get("/laws", list.execute.bind(list));
  }
}
