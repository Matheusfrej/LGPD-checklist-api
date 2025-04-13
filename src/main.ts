import "dotenv/config";
import "module-alias/register";
import { CmdRest } from "./delivery/api/rest/cmd/server";
import { PrismaRepositoryFactory } from "./domain/factory/prismaRepositoryFactory";
import { RepositoryFactory } from "./domain/factory/repositoryFactory";
import { PrismaClient } from "@prisma/client";

class Main {
  public restApp: CmdRest;

  constructor(factory: RepositoryFactory) {
    this.restApp = new CmdRest(factory);
  }

  public init(): void {
    this.restApp.startServer();
  }
}

const prisma = new PrismaClient();
const main = new Main(new PrismaRepositoryFactory(prisma));

main.init();

export const restApp = main.restApp.app;
