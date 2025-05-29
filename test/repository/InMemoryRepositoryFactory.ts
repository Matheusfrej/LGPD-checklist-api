import { AuthFakeRepository } from "./auth";
import { ChecklistInMemoryRepository } from "./checklist";
import { ItemInMemoryRepository } from "./item";
import { SystemInMemoryRepository } from "./system";
import { UserInMemoryRepository } from "./user";
import { LawInMemoryRepository } from "./law";
import { DeviceInMemoryRepository } from "./device";
import { AuthRepositoryInterface } from "../../src/domain/usecase/repository/auth";
import { ChecklistRepositoryInterface } from "../../src/domain/usecase/repository/checklist";
import { DeviceRepositoryInterface } from "../../src/domain/usecase/repository/device";
import { ItemRepositoryInterface } from "../../src/domain/usecase/repository/item";
import { LawRepositoryInterface } from "../../src/domain/usecase/repository/law";
import { SystemRepositoryInterface } from "../../src/domain/usecase/repository/system";
import { UserRepositoryInterface } from "../../src/domain/usecase/repository/user";
import { SectionRepositoryInterface } from "../../src/domain/usecase/repository/section";
import { RepositoryFactory } from "../../src/domain/factory/repositoryFactory";
import { SectionInMemoryRepository } from "./section";

export class InMemoryRepositoryFactory implements RepositoryFactory {
  makeUserRepository(): UserRepositoryInterface {
    return new UserInMemoryRepository();
  }

  makeSystemRepository(): SystemRepositoryInterface {
    return new SystemInMemoryRepository();
  }

  makeChecklistRepository(): ChecklistRepositoryInterface {
    return new ChecklistInMemoryRepository();
  }

  makeItemRepository(): ItemRepositoryInterface {
    return new ItemInMemoryRepository();
  }

  makeLawRepository(): LawRepositoryInterface {
    return new LawInMemoryRepository();
  }

  makeDeviceRepository(): DeviceRepositoryInterface {
    return new DeviceInMemoryRepository();
  }

  makeSectionRepository(): SectionRepositoryInterface {
    return new SectionInMemoryRepository();
  }

  makeAuthRepository(): AuthRepositoryInterface {
    return new AuthFakeRepository();
  }
}
