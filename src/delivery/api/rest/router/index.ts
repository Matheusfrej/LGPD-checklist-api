import express from "express";
import { CorsRouter } from "./cors";
import { UserRouter } from "./user";
import { SystemRouter } from "./system";
import { ChecklistRouter } from "./checklist";
import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";
import { LawRouter } from "./law";
import { DeviceRouter } from "./device";
import { ItemRouter } from "./item";

class Router {
  constructor(app: express.Router, factory: RepositoryFactory) {
    app.use(new CorsRouter().getRouter());
    app.use(new UserRouter(factory).getRouter());
    app.use(new SystemRouter(factory).getRouter());
    app.use(new ChecklistRouter(factory).getRouter());
    app.use(new LawRouter(factory).getRouter());
    app.use(new DeviceRouter(factory).getRouter());
    app.use(new ItemRouter(factory).getRouter());
  }
}

export { Router };
