import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";
import { ListItemsController } from "../controller/item";
import { CustomRouter } from "./customRouter";

export class ItemRouter extends CustomRouter {
  constructor(factory: RepositoryFactory) {
    super();

    const list = new ListItemsController(factory);

    this.router.get("/items", list.execute.bind(list));
  }
}
