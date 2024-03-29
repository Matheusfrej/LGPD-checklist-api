import express from "express";
import { CorsRouter } from "./cors";
import { UserRouter } from "./user";

class Router {
  constructor(app: express.Router) {
    app.use(new CorsRouter().getRouter());
    app.use(new UserRouter().getRouter());
  }
}

export { Router };
