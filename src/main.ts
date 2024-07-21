import "dotenv/config";
import "module-alias/register";
import { CmdRest } from "./delivery/api/rest/cmd/server";

const REST = "rest";

class Main {
  public restApp: CmdRest;

  constructor() {
    this.restApp = new CmdRest();
  }

  public initDev(): void {
    this.restApp.startServer();
  }

  public init(): void {
    if (this.checkEnvVar()) {
      if (process.env.SERVER === REST) {
        this.restApp.startServer();
      }
    }
  }

  private checkEnvVar(): boolean {
    if (!process.env.SERVER) {
      console.log("env var SERVER not found");
      return false;
    }
    if (!process.env.DATABASE_URL) {
      console.log("env var DATABASE_URL not found");
      return false;
    }
    if (!process.env.JWT_SECRET) {
      console.log("env var JWT_SECRET not found");
      return false;
    }

    return true;
  }

  public waitUntilRestIsReady(): Promise<void> {
    return this.restApp.waitUntilReady();
  }

  public closeRestServer(): Promise<void> {
    return this.restApp.closeServer();
  }
}

const main = new Main();

if (process.env.NODE_ENV === "production") {
  main.init();
} else {
  main.initDev();
}

export const restApp = main.restApp.app;
export const waitUntilRestIsReady = main.waitUntilRestIsReady.bind(main);
export const closeRestServer = main.closeRestServer.bind(main);
