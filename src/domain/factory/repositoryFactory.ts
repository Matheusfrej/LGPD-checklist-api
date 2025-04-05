import { AuthRepositoryInterface } from "../usecase/repository/auth";
import { ChecklistRepositoryInterface } from "../usecase/repository/checklist";
import { ItemRepositoryInterface } from "../usecase/repository/item";
import { SystemRepositoryInterface } from "../usecase/repository/system";
import { UserRepositoryInterface } from "../usecase/repository/user";

export interface RepositoryFactory {
  makeUserRepository(): UserRepositoryInterface;
  makeSystemRepository(): SystemRepositoryInterface;
  makeChecklistRepository(): ChecklistRepositoryInterface;
  makeItemRepository(): ItemRepositoryInterface;
  makeAuthRepository(): AuthRepositoryInterface;
}
