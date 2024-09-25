import bcrypt from "bcryptjs";
import { SystemRepositoryInterface } from "../../src/domain/usecase/repository/system";
import { UserRepositoryInterface } from "../../src/domain/usecase/repository/user";
import { ChecklistRepositoryInterface } from "../../src/domain/usecase/repository/checklist";
import { Json } from "../../src/domain/@types";
const { genSaltSync, hashSync } = bcrypt;

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
  public checklistData: Json = {
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

  async createChecklistMock({
    userId = 1,
    tokenUserId = 1,
    systemId = 1,
    isGeneral = true,
    isIot = false,
    checklistData = this.checklistData,
  } = {}) {
    if (this.checklistRepository) {
      return await this.checklistRepository.createChecklist({
        userId,
        tokenUserId,
        systemId,
        checklistData,
        isGeneral,
        isIot,
      });
    }
    throw new NoRepositoryError(Repositories.Checklist);
  }

  async createUserAndSystemMock() {
    const user = await this.createUserMock();
    const system = await this.createSystemMock();

    return {
      user,
      system,
    };
  }

  async createUserSystemAndChecklistMock() {
    const user = await this.createUserMock();
    const system = await this.createSystemMock();
    const checklist = await this.createChecklistMock();

    return {
      user,
      system,
      checklist,
    };
  }
}

export { MockGenerator, NoRepositoryError };
