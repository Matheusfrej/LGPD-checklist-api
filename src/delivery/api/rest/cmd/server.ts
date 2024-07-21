import express from "express";
import http from "http";
import logger from "morgan";
import bodyParser from "body-parser";

import { PORT } from "../config/config";
import { Router } from "../router/index";

class CmdRest {
  public app: express.Application;
  public isReady: boolean = false;
  private server: http.Server;
  private serverReadyPromise: Promise<void>;
  private resolveServerReady: () => void;

  constructor() {
    this.app = express();
    this.middleware();
    this.router();

    this.serverReadyPromise = new Promise<void>((resolve) => {
      this.resolveServerReady = resolve;
    });
  }

  private router() {
    (() => new Router(this.app))();
  }

  private middleware() {
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  public startServer(): void {
    this.server = http.createServer(this.app);

    this.server.listen(PORT, () => {
      console.log(`Server is Running... at http://localhost:${PORT}`);
      this.isReady = true;
      this.resolveServerReady();
    });
  }

  public waitUntilReady(): Promise<void> {
    return this.serverReadyPromise;
  }

  public closeServer(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.server) {
        this.server.close((err) => {
          if (err) {
            reject(err);
          } else {
            console.log("Server is closed.");
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}

export { CmdRest };
