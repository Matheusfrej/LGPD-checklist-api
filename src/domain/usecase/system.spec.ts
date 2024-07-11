import { beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "../../../test/repository/user";
import { SystemInMemoryRepository } from "../../../test/repository/system";
import { genSaltSync, hashSync } from "bcryptjs";
import { CreateSystemUseCase, ListSystemsByUserIdUseCase } from "./system";
import { expectPreConditionalError } from "../../../test/utils/expectPreConditionalError";

let userRepository: UserInMemoryRepository;
let systemRepository: SystemInMemoryRepository;

async function createMockUser({
  name = "Fulano",
  email = "fulano@exemplo.com",
  office = "Desenvolvedor",
  password = "Teste123!",
} = {}) {
  return await userRepository.createUser({
    name,
    email,
    office,
    password: hashSync(password, genSaltSync(11)),
  });
}

async function createMockSystem({
  name = "Sistema LGPD",
  description = "Descrição do sistema LGPD",
  userId = 1,
  tokenUserId = 1,
} = {}) {
  return await systemRepository.createSystem({
    name,
    description,
    userId,
    tokenUserId,
  });
}

async function createMockUserAndSystem() {
  await createMockUser();
  await createMockSystem();
}

describe("Create System Use Case", () => {
  let useCase: CreateSystemUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    systemRepository = new SystemInMemoryRepository();
    useCase = new CreateSystemUseCase(systemRepository, userRepository);
  });

  it("should create system", async () => {
    const userId = 1;

    await createMockUser();

    const oldSize = systemRepository.items.length;

    const result = await useCase.execute({
      name: "Sistema LGPD",
      description: "Descrição do sistema LGPD",
      userId,
      tokenUserId: userId,
    });

    expect(result.error).toBe(null);
    expect(result.system.id).toEqual(expect.any(Number));
    expect(result.system.userId).toEqual(userId);
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

    expectPreConditionalError(result.error);
    expect(result.system).toBe(null);
    expect(oldSize).toBe(systemRepository.items.length);
  });

  it("should not create system for user different from authenticated user", async () => {
    const oldSize = systemRepository.items.length;

    await createMockUser();

    const result = await useCase.execute({
      name: "Sistema LGPD",
      description: "Descrição do sistema LGPD",
      userId: 1,
      tokenUserId: 2,
    });

    expectPreConditionalError(result.error, true);
    expect(result.system).toBe(null);
    expect(oldSize).toBe(systemRepository.items.length);
  });

  it("should not create system for no user", async () => {
    const oldSize = systemRepository.items.length;

    await createMockUser();

    const result = await useCase.execute({
      name: "Sistema LGPD",
      description: "Descrição do sistema LGPD",
      userId: undefined,
      tokenUserId: 1,
    });

    expectPreConditionalError(result.error);
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
  });

  it("should list user systems", async () => {
    const userId = 1;

    await createMockUserAndSystem();
    await createMockUser();
    await createMockSystem();
    await createMockSystem({ userId: 2, tokenUserId: 2 });

    const result = await useCase.execute({
      userId,
      tokenUserId: userId,
    });

    expect(result.error).toBe(null);
    expect(result.systems[0].userId).toBe(userId);
    expect(result.systems.length).toBe(systemRepository.items.length - 1);

    result.systems.forEach((system) => {
      expect(system.userId).toBe(userId);
    });
  });

  it("should list empty list when user doesnt have systems", async () => {
    const userId = 1;

    await createMockUser();

    const result = await useCase.execute({
      userId,
      tokenUserId: userId,
    });

    expect(result.error).toBe(null);
    expect(result.systems.length).toBe(0);
  });

  it("should not list systems when user authenticated is different from user", async () => {
    const userId = 1;

    await createMockUserAndSystem();

    const result = await useCase.execute({
      userId,
      tokenUserId: 2,
    });

    expectPreConditionalError(result.error, true);
  });

  it("should not list systems from inexistent user", async () => {
    const userId = 1;

    await createMockSystem();

    const result = await useCase.execute({
      userId,
      tokenUserId: userId,
    });

    expectPreConditionalError(result.error);
  });
});
