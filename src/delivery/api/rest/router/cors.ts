import cors from "cors";
import { Request, Response, NextFunction, Router } from "express";

class CorsRouter {
  private router: Router;

  constructor() {
    this.router = Router();

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

  getRouter(): Router {
    return this.router;
  }
}

export { CorsRouter };
