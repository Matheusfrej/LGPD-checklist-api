import cors from "cors";
import { Request, Response, NextFunction } from "express";
import { CustomRouter } from "./customRouter";

class CorsRouter extends CustomRouter {
  constructor() {
    super();

    this.router.options("*", cors());

    this.router.use("*", (_: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Methods", "*");
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
      );
      next();
    });
  }
}

export { CorsRouter };
