import bcrypt from "bcryptjs";
import { SystemRepositoryInterface } from "../../src/domain/usecase/repository/system";
import { UserRepositoryInterface } from "../../src/domain/usecase/repository/user";
import { ChecklistRepositoryInterface } from "../../src/domain/usecase/repository/checklist";
import { AnswerType, SeverityDegreeType } from "../domain/entity/checklistItem";
import { ItemRepositoryInterface } from "../domain/usecase/repository/item";
import { LawRepositoryInterface } from "../domain/usecase/repository/law";
import { DeviceRepositoryInterface } from "../domain/usecase/repository/device";
const { genSaltSync, hashSync } = bcrypt;

enum Repositories {
  "User" = "User",
  "System" = "System",
  "Checklist" = "Checklist",
  "Item" = "Item",
  "Law" = "Law",
  "Device" = "Device",
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
  private lawRepository: LawRepositoryInterface;
  private deviceRepository: DeviceRepositoryInterface;

  constructor(
    userRepository?: UserRepositoryInterface,
    systemRepository?: SystemRepositoryInterface,
    checklistRepository?: ChecklistRepositoryInterface,
    itemRepository?: ItemRepositoryInterface,
    lawRepository?: LawRepositoryInterface,
    deviceRepository?: DeviceRepositoryInterface,
  ) {
    this.userRepository = userRepository;
    this.systemRepository = systemRepository;
    this.checklistRepository = checklistRepository;
    this.itemRepository = itemRepository;
    this.lawRepository = lawRepository;
    this.deviceRepository = deviceRepository;
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
    laws = [1],
    devices = [1],
  } = {}) {
    if (this.checklistRepository) {
      return await this.checklistRepository.createChecklist({
        userId,
        tokenUserId,
        systemId,
        items,
        laws,
        devices,
      });
    }
    throw new NoRepositoryError(Repositories.Checklist);
  }

  async createItemMock({
    code = "I-01",
    itemDesc = "itemDesc",
    recommendations = "recommendations",
    isMandatory = true,
    lawsIds = [1],
    devicesIds = [1],
  } = {}) {
    if (this.itemRepository) {
      return await this.itemRepository.createItem({
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

  async createLawMock({ name = "LGPD" } = {}) {
    if (this.lawRepository) {
      return await this.lawRepository.create({
        name,
      });
    }
    throw new NoRepositoryError(Repositories.Law);
  }

  async createDeviceMock({ name = "Sensor IoT" } = {}) {
    if (this.deviceRepository) {
      return await this.deviceRepository.create({
        name,
      });
    }
    throw new NoRepositoryError(Repositories.Device);
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

  async createItemAndLawAndDeviceAndChecklistMock() {
    const item = await this.createItemMock();
    const law = await this.createLawMock();
    const device = await this.createDeviceMock();
    const checklist = await this.createChecklistMock();

    return {
      item,
      law,
      device,
      checklist,
    };
  }
}

export { MockGenerator, NoRepositoryError };
