import { genSaltSync, hashSync } from "bcryptjs";
import { SystemRepositoryInterface } from "../domain/usecase/repository/system";
import { UserRepositoryInterface } from "../domain/usecase/repository/user";
import { ChecklistRepositoryInterface } from "../domain/usecase/repository/checklist";

enum Repositories {
  "User" = "User",
  "System" = "System",
  "Checklist" = "Checklist",
}

class NoRepositoryError extends Error {
  constructor(repo: Repositories) {
    super(`Please, provide ${repo} Repository in class constructor`);
  }
}

class MockGenerator {
  private userRepository: UserRepositoryInterface;
  private systemRepository: SystemRepositoryInterface;
  private checklistRepository: ChecklistRepositoryInterface;
  public checklistData = {
    message: "hello",
  };

  constructor(
    userRepository?: UserRepositoryInterface,
    systemRepository?: SystemRepositoryInterface,
    checklistRepository?: ChecklistRepositoryInterface,
  ) {
    this.userRepository = userRepository;
    this.systemRepository = systemRepository;
    this.checklistRepository = checklistRepository;
  }

  async createUserMock({
    name = "Fulano",
    email = "fulano@exemplo.com",
    office = "Desenvolvedor",
    password = "Teste123!",
  } = {}) {
    if (this.userRepository) {
      return await this.userRepository.createUser({
        name,
        email,
        office,
        password: hashSync(password, genSaltSync(11)),
      });
    }
    throw new NoRepositoryError(Repositories.User);
  }

  async createSystemMock({
    name = "Sistema LGPD",
    description = "Descrição do sistema LGPD",
    userId = 1,
    tokenUserId = 1,
  } = {}) {
    if (this.systemRepository) {
      return await this.systemRepository.createSystem({
        name,
        description,
        userId,
        tokenUserId,
      });
    }
    throw new NoRepositoryError(Repositories.System);
  }

  async createUserAndSystemMock() {
    const user = await this.createUserMock();
    const system = await this.createSystemMock();

    return {
      user,
      system,
    };
  }
}

export { MockGenerator, NoRepositoryError };
