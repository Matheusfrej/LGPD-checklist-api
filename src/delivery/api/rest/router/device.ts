import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";
import { ListDevicesController } from "../controller/device";
import { CustomRouter } from "./customRouter";

export class DeviceRouter extends CustomRouter {
  constructor(factory: RepositoryFactory) {
    super();

    const list = new ListDevicesController(factory);

    this.router.get("/devices", list.execute.bind(list));
  }
}
