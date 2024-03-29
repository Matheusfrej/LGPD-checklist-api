import "dotenv/config";
import "module-alias/register";
import { CmdRest } from "./delivery/api/rest/cmd/server";

const REST = "rest";

class Main {
  public initDev(): void {
    new CmdRest().server();
  }

  public init(): void {
    if (this.checkEnvVar()) {
      if (process.env.SERVER === REST) {
        new CmdRest().server();
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
}

if (process.env.NODE_ENV === "production") {
  new Main().init();
} else {
  new Main().initDev();
}
