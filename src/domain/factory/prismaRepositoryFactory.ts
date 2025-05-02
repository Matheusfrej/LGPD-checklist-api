import { PrismaClient } from "@prisma/client";
import { AuthJWTRepository } from "../../infrastructure/provider/repository/auth";
import { ChecklistPrismaRepository } from "../../infrastructure/provider/repository/prisma/checklist";
import { ItemPrismaRepository } from "../../infrastructure/provider/repository/prisma/item";
import { SystemPrismaRepository } from "../../infrastructure/provider/repository/prisma/system";
import { UserPrismaRepository } from "../../infrastructure/provider/repository/prisma/user";
import { AuthRepositoryInterface } from "../usecase/repository/auth";
import { ChecklistRepositoryInterface } from "../usecase/repository/checklist";
import { ItemRepositoryInterface } from "../usecase/repository/item";
import { SystemRepositoryInterface } from "../usecase/repository/system";
import { UserRepositoryInterface } from "../usecase/repository/user";
import { RepositoryFactory } from "./repositoryFactory";
import { LawPrismaRepository } from "../../infrastructure/provider/repository/prisma/law";
import { DevicePrismaRepository } from "../../infrastructure/provider/repository/prisma/device";
import { DeviceRepositoryInterface } from "../usecase/repository/device";
import { LawRepositoryInterface } from "../usecase/repository/law";

export class PrismaRepositoryFactory implements RepositoryFactory {
  constructor(private prisma: PrismaClient) {}

  makeUserRepository(): UserRepositoryInterface {
    return new UserPrismaRepository(this.prisma);
  }

  makeSystemRepository(): SystemRepositoryInterface {
    return new SystemPrismaRepository(this.prisma);
  }

  makeChecklistRepository(): ChecklistRepositoryInterface {
    return new ChecklistPrismaRepository(this.prisma);
  }

  makeItemRepository(): ItemRepositoryInterface {
    return new ItemPrismaRepository(this.prisma);
  }

  makeLawRepository(): LawRepositoryInterface {
    return new LawPrismaRepository(this.prisma);
  }

  makeDeviceRepository(): DeviceRepositoryInterface {
    return new DevicePrismaRepository(this.prisma);
  }

  makeAuthRepository(): AuthRepositoryInterface {
    return new AuthJWTRepository();
  }
}
