import express from "express";
import { CorsRouter } from "./cors";
import { UserRouter } from "./user";
import { SystemRouter } from "./system";
import { ChecklistRouter } from "./checklist";

class Router {
  constructor(app: express.Router) {
    app.use(new CorsRouter().getRouter());
    app.use(new UserRouter().getRouter());
    app.use(new SystemRouter().getRouter());
    app.use(new ChecklistRouter().getRouter());
  }
}

export { Router };
