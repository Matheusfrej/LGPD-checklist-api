import { AuthFakeRepository } from "../../../test/repository/auth";
import { ChecklistInMemoryRepository } from "../../../test/repository/checklist";
import { ItemInMemoryRepository } from "../../../test/repository/item";
import { SystemInMemoryRepository } from "../../../test/repository/system";
import { UserInMemoryRepository } from "../../../test/repository/user";
import { LawInMemoryRepository } from "../../../test/repository/law";
import { DeviceInMemoryRepository } from "../../../test/repository/device";
import { AuthRepositoryInterface } from "../usecase/repository/auth";
import { ChecklistRepositoryInterface } from "../usecase/repository/checklist";
import { DeviceRepositoryInterface } from "../usecase/repository/device";
import { ItemRepositoryInterface } from "../usecase/repository/item";
import { LawRepositoryInterface } from "../usecase/repository/law";
import { SystemRepositoryInterface } from "../usecase/repository/system";
import { UserRepositoryInterface } from "../usecase/repository/user";
import { RepositoryFactory } from "./repositoryFactory";

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

  makeAuthRepository(): AuthRepositoryInterface {
    return new AuthFakeRepository();
  }
}
