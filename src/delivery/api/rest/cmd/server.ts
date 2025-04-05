import express from "express";
import http from "http";
import logger from "morgan";
import bodyParser from "body-parser";

import { PORT } from "../config/config";
import { Router } from "../router/index";
import { env } from "@/domain/env";
import { RepositoryFactory } from "../../../../domain/factory/repositoryFactory";

class CmdRest {
  public app: express.Application;
  private server: http.Server;

  constructor(factory: RepositoryFactory) {
    this.app = express();
    this.middleware();
    this.router(factory);
  }

  private router(factory: RepositoryFactory) {
    (() => new Router(this.app, factory))();
  }

  private middleware() {
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  public startServer(): void {
    this.server = http.createServer(this.app);

    if (env.NODE_ENV !== "test") {
      this.server.listen(PORT, () => {
        console.log(`Server is Running... at http://localhost:${PORT}`);
      });
    }
  }
}

export { CmdRest };
