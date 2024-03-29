import express from "express";
import http from "http";
import logger from "morgan";
import bodyParser from "body-parser";

import { PORT } from "../config/config";
import { Router } from "../router/index";

class CmdRest {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.router();
  }

  private router() {
    (() => new Router(this.app))();
  }

  private middleware() {
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  public server(): void {
    const server = http.createServer(this.app);

    server.listen(PORT, () => {
      console.log(`Server is Running... at http://localhost:${PORT}`);
    });
  }
}

export { CmdRest };
