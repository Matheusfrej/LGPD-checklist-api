import { AuthRepositoryInterface } from "../usecase/repository/auth";
import { ChecklistRepositoryInterface } from "../usecase/repository/checklist";
import { DeviceRepositoryInterface } from "../usecase/repository/device";
import { ItemRepositoryInterface } from "../usecase/repository/item";
import { LawRepositoryInterface } from "../usecase/repository/law";
import { SystemRepositoryInterface } from "../usecase/repository/system";
import { UserRepositoryInterface } from "../usecase/repository/user";

export interface RepositoryFactory {
  makeUserRepository(): UserRepositoryInterface;
  makeSystemRepository(): SystemRepositoryInterface;
  makeChecklistRepository(): ChecklistRepositoryInterface;
  makeItemRepository(): ItemRepositoryInterface;
  makeLawRepository(): LawRepositoryInterface;
  makeDeviceRepository(): DeviceRepositoryInterface;
  makeAuthRepository(): AuthRepositoryInterface;
}
