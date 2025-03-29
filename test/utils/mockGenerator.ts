import bcrypt from "bcryptjs";
import { SystemRepositoryInterface } from "../../src/domain/usecase/repository/system";
import { UserRepositoryInterface } from "../../src/domain/usecase/repository/user";
import { ChecklistRepositoryInterface } from "../../src/domain/usecase/repository/checklist";
import { AnswerType, SeverityDegreeType } from "../domain/entity/checklistItem";
import { ItemRepositoryInterface } from "../domain/usecase/repository/item";
const { genSaltSync, hashSync } = bcrypt;

enum Repositories {
  "User" = "User",
  "System" = "System",
  "Checklist" = "Checklist",
  "Item" = "Item",
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
  private itemRepository: ItemRepositoryInterface;

  constructor(
    userRepository?: UserRepositoryInterface,
    systemRepository?: SystemRepositoryInterface,
    checklistRepository?: ChecklistRepositoryInterface,
    itemRepository?: ItemRepositoryInterface,
  ) {
    this.userRepository = userRepository;
    this.systemRepository = systemRepository;
    this.checklistRepository = checklistRepository;
    this.itemRepository = itemRepository;
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
    items = [
      {
        id: 1,
        answer: "Sim" as AnswerType,
        severityDegree: undefined as SeverityDegreeType,
        userComment: undefined as string,
      },
    ],
  } = {}) {
    if (this.checklistRepository) {
      return await this.checklistRepository.createChecklist({
        userId,
        tokenUserId,
        systemId,
        items,
      });
    }
    throw new NoRepositoryError(Repositories.Checklist);
  }

  async createItemMock({
    id = 1,
    code = "I-01",
    itemDesc = "itemDesc",
    recommendations = "recommendations",
    isMandatory = true,
    lawsIds = [1],
    devicesIds = [1],
  } = {}) {
    if (this.itemRepository) {
      return await this.itemRepository.createItem({
        id,
        code,
        itemDesc,
        recommendations,
        isMandatory,
        lawsIds,
        devicesIds,
      });
    }
    throw new NoRepositoryError(Repositories.Item);
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

  async createItemAndChecklistMock() {
    const item = await this.createItemMock();
    const checklist = await this.createChecklistMock();

    return {
      item,
      checklist,
    };
  }
}

export { MockGenerator, NoRepositoryError };
