import "dotenv/config";
import "module-alias/register";
import { CmdRest } from "./delivery/api/rest/cmd/server";

class Main {
  public restApp: CmdRest;

  constructor() {
    this.restApp = new CmdRest();
  }

  public init(): void {
    this.restApp.startServer();
  }
}

const main = new Main();

main.init();

export const restApp = main.restApp.app;
