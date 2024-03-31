import express from "express";
import { CorsRouter } from "./cors";
import { UserRouter } from "./user";
import { SystemRouter } from "./system";

class Router {
  constructor(app: express.Router) {
    app.use(new CorsRouter().getRouter());
    app.use(new UserRouter().getRouter());
    app.use(new SystemRouter().getRouter());
  }
}

export { Router };
