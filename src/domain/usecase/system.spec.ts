import { beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "../../../test/repository/user";
import { SystemInMemoryRepository } from "../../../test/repository/system";
import {
  CreateSystemUseCase,
  DeleteSystemUseCase,
  GetSystemUseCase,
  ListSystemsByUserIdUseCase,
  UpdateSystemUseCase,
} from "./system";
import { expectPreConditionalError } from "../../../test/utils/expectPreConditionalError";
import { SystemEntity } from "../entity/system";
import { MockGenerator } from "../../../test/utils/mockGenerator";

let userRepository: UserInMemoryRepository;
let systemRepository: SystemInMemoryRepository;
let mockGenerator: MockGenerator;

describe("Create System Use Case", () => {
  let useCase: CreateSystemUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    systemRepository = new SystemInMemoryRepository();
    useCase = new CreateSystemUseCase(systemRepository, userRepository);
    mockGenerator = new MockGenerator(userRepository, systemRepository);
  });

  it("should create system", async () => {
    const user = await mockGenerator.createUserMock();

    const oldSize = systemRepository.items.length;

    const result = await useCase.execute({
      name: "Sistema LGPD",
      description: "Descrição do sistema LGPD",
      userId: user.id,
      tokenUserId: user.id,
    });

    expect(result.error).toBe(null);
    expect(result.system.id).toEqual(expect.any(Number));
    expect(result.system.userId).toEqual(user.id);
    expect(systemRepository.items[0]).toEqual(result.system);
    expect(oldSize).toBe(systemRepository.items.length - 1);
  });

  it("should not create system for unexistent user", async () => {
    const userId = 1;

    const oldSize = systemRepository.items.length;

    const result = await useCase.execute({
      name: "Sistema LGPD",
      description: "Descrição do sistema LGPD",
      userId,
      tokenUserId: userId,
    });

    expectPreConditionalError({ error: result.error });
    expect(result.system).toBe(null);
    expect(oldSize).toBe(systemRepository.items.length);
  });

  it("should not create system for user different from authenticated user", async () => {
    const oldSize = systemRepository.items.length;

    const user = await mockGenerator.createUserMock();

    const result = await useCase.execute({
      name: "Sistema LGPD",
      description: "Descrição do sistema LGPD",
      userId: user.id,
      tokenUserId: user.id + 1,
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
    expect(result.system).toBe(null);
    expect(oldSize).toBe(systemRepository.items.length);
  });

  it("should not create system for no user", async () => {
    const oldSize = systemRepository.items.length;

    const user = await mockGenerator.createUserMock();

    const result = await useCase.execute({
      name: "Sistema LGPD",
      description: "Descrição do sistema LGPD",
      userId: undefined,
      tokenUserId: user.id,
    });

    expectPreConditionalError({ error: result.error });
    expect(result.system).toBe(null);
    expect(oldSize).toBe(systemRepository.items.length);
  });
});

describe("List User Systems Use Case", () => {
  let useCase: ListSystemsByUserIdUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    systemRepository = new SystemInMemoryRepository();
    useCase = new ListSystemsByUserIdUseCase(systemRepository, userRepository);
    mockGenerator = new MockGenerator(userRepository, systemRepository);
  });

  it("should list user systems", async () => {
    const { user: user1 } = await mockGenerator.createUserAndSystemMock();
    const user2 = await mockGenerator.createUserMock();
    const system2 = await mockGenerator.createSystemMock({ userId: user1.id });
    await mockGenerator.createSystemMock({
      userId: user2.id,
      tokenUserId: user2.id,
    });

    const result = await useCase.execute({
      userId: user1.id,
      tokenUserId: user1.id,
    });

    expect(result.error).toBe(null);
    expect(result.systems[1]).toEqual(system2);
    expect(result.systems.length).toBe(systemRepository.items.length - 1);

    result.systems.forEach((system) => {
      expect(system.userId).toBe(user1.id);
    });
  });

  it("should list empty list when user doesnt have systems", async () => {
    const user = await mockGenerator.createUserMock();

    const result = await useCase.execute({
      userId: user.id,
      tokenUserId: user.id,
    });

    expect(result.error).toBe(null);
    expect(result.systems.length).toBe(0);
  });

  it("should not list systems when user authenticated is different from user", async () => {
    const { user } = await mockGenerator.createUserAndSystemMock();

    const result = await useCase.execute({
      userId: user.id,
      tokenUserId: user.id + 1,
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
  });

  it("should not list systems from inexistent user", async () => {
    const userId = 1;

    const result = await useCase.execute({
      userId,
      tokenUserId: userId,
    });

    expectPreConditionalError({ error: result.error, noPermission: false });
  });
});

describe("Get System Use Case", () => {
  let useCase: GetSystemUseCase;

  beforeEach(() => {
    systemRepository = new SystemInMemoryRepository();
    useCase = new GetSystemUseCase(systemRepository);
    mockGenerator = new MockGenerator(userRepository, systemRepository);
  });

  it("should get system", async () => {
    const system = await mockGenerator.createSystemMock();

    const result = await useCase.execute({
      id: system.id,
    });

    expect(result.error).toBe(null);
    expect(result.system).toBeInstanceOf(SystemEntity);
    expect(system).toEqual(result.system);
  });

  it("should not get inexistent system", async () => {
    const id = 1;

    const result = await useCase.execute({
      id,
    });

    expectPreConditionalError({ error: result.error });
    expect(result.system).toBe(null);
  });
});

describe("Update System Use Case", () => {
  let useCase: UpdateSystemUseCase;

  beforeEach(() => {
    systemRepository = new SystemInMemoryRepository();
    useCase = new UpdateSystemUseCase(systemRepository);
    mockGenerator = new MockGenerator(userRepository, systemRepository);
  });

  it("should update system", async () => {
    const newName = "Sistema LGPD Alterado";
    const newDescription = "Descrição do sistema LGPD Alterado";

    const oldSystem = { ...(await mockGenerator.createSystemMock()) };

    const oldSize = systemRepository.items.length;

    const result = await useCase.execute({
      id: oldSystem.id,
      tokenUserId: oldSystem.userId,
      name: newName,
      description: newDescription,
    });

    const systemUpdated = systemRepository.items.find(
      (item) => item.id === oldSystem.id,
    );

    expect(result.error).toBe(null);
    expect(systemUpdated).toBeInstanceOf(SystemEntity);
    expect(systemUpdated.name).toBe(newName);
    expect(systemUpdated.description).toBe(newDescription);
    expect(oldSystem).not.toEqual(systemUpdated);
    expect(oldSize).toBe(systemRepository.items.length);
    expect(systemUpdated.id).toBe(oldSystem.id);
    expect(systemUpdated.userId).toBe(oldSystem.userId);
  });

  it("should be able to update only name of system", async () => {
    const newName = "Sistema LGPD Alterado";

    const oldSystem = { ...(await mockGenerator.createSystemMock()) };

    const oldSize = systemRepository.items.length;

    const result = await useCase.execute({
      id: oldSystem.id,
      tokenUserId: oldSystem.userId,
      name: newName,
      description: oldSystem.description,
    });

    const systemUpdated = systemRepository.items.find(
      (item) => item.id === oldSystem.id,
    );

    expect(result.error).toBe(null);
    expect(systemUpdated).toBeInstanceOf(SystemEntity);
    expect(systemUpdated.name).toBe(newName);
    expect(systemUpdated.description).toBe(oldSystem.description);
    expect(oldSystem).not.toEqual(systemUpdated);
    expect(oldSize).toBe(systemRepository.items.length);
    expect(systemUpdated.id).toBe(oldSystem.id);
    expect(systemUpdated.userId).toBe(oldSystem.userId);
  });

  it("should be able to update only description of system", async () => {
    const newDescription = "Descrição";

    const oldSystem = {
      ...(await mockGenerator.createSystemMock()),
    };

    const oldSize = systemRepository.items.length;

    const result = await useCase.execute({
      id: oldSystem.id,
      tokenUserId: oldSystem.userId,
      name: oldSystem.name,
      description: newDescription,
    });

    const systemUpdated = systemRepository.items.find(
      (item) => item.id === oldSystem.id,
    );

    expect(result.error).toBe(null);
    expect(systemUpdated).toBeInstanceOf(SystemEntity);
    expect(systemUpdated.name).toBe(oldSystem.name);
    expect(systemUpdated.description).toBe(newDescription);
    expect(oldSystem).not.toEqual(systemUpdated);
    expect(oldSize).toBe(systemRepository.items.length);
    expect(systemUpdated.id).toBe(oldSystem.id);
    expect(systemUpdated.userId).toBe(oldSystem.userId);
  });

  it("should not update system with wrong id on token", async () => {
    const newName = "Sistema LGPD Alterado";
    const newDescription = "Descrição";

    const oldSystem = {
      ...(await mockGenerator.createSystemMock()),
    };

    const result = await useCase.execute({
      id: oldSystem.id,
      tokenUserId: oldSystem.userId + 1,
      name: newName,
      description: newDescription,
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
    expect(oldSystem).toEqual(systemRepository.items[0]);
  });

  it("should not update inexistent system", async () => {
    const id = 1;
    const newName = "Sistema LGPD Alterado";
    const newDescription = "Descrição";

    const result = await useCase.execute({
      id,
      tokenUserId: id,
      name: newName,
      description: newDescription,
    });

    expectPreConditionalError({ error: result.error });
  });
});

describe("Delete System Use Case", () => {
  let useCase: DeleteSystemUseCase;

  beforeEach(() => {
    systemRepository = new SystemInMemoryRepository();
    useCase = new DeleteSystemUseCase(systemRepository);
    mockGenerator = new MockGenerator(userRepository, systemRepository);
  });

  it("should delete system", async () => {
    const id = 1;

    await mockGenerator.createSystemMock();

    const oldSize = systemRepository.items.length;

    const result = await useCase.execute({
      id,
      tokenUserId: id,
    });

    expect(result.error).toBe(null);
    expect(systemRepository.items.length).toBe(0);
    expect(systemRepository.items.length).toBe(oldSize - 1);
  });

  it("should not delete inexistent system", async () => {
    const id = 1;

    const result = await useCase.execute({
      id,
      tokenUserId: id,
    });

    expectPreConditionalError({ error: result.error });
    expect(systemRepository.items.length).toBe(0);
  });

  it("should not delete system if system doesnt belong to authenticated user", async () => {
    const id = 1;

    await mockGenerator.createSystemMock();

    const result = await useCase.execute({
      id,
      tokenUserId: id + 1,
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
    expect(systemRepository.items.length).toBe(1);
  });
});
