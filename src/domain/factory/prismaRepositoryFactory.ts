import { AuthJWTRepository } from "../../infrastructure/provider/repository/auth";
import { ChecklistPrismaRepository } from "../../infrastructure/provider/repository/checklist";
import { ItemPrismaRepository } from "../../infrastructure/provider/repository/item";
import { SystemPrismaRepository } from "../../infrastructure/provider/repository/system";
import { UserPrismaRepository } from "../../infrastructure/provider/repository/user";
import { AuthRepositoryInterface } from "../usecase/repository/auth";
import { ChecklistRepositoryInterface } from "../usecase/repository/checklist";
import { ItemRepositoryInterface } from "../usecase/repository/item";
import { SystemRepositoryInterface } from "../usecase/repository/system";
import { UserRepositoryInterface } from "../usecase/repository/user";
import { RepositoryFactory } from "./repositoryFactory";

export class PrismaRepositoryFactory implements RepositoryFactory {
  makeUserRepository(): UserRepositoryInterface {
    return new UserPrismaRepository();
  }

  makeSystemRepository(): SystemRepositoryInterface {
    return new SystemPrismaRepository();
  }

  makeChecklistRepository(): ChecklistRepositoryInterface {
    return new ChecklistPrismaRepository();
  }

  makeItemRepository(): ItemRepositoryInterface {
    return new ItemPrismaRepository();
  }

  makeAuthRepository(): AuthRepositoryInterface {
    return new AuthJWTRepository();
  }
}
