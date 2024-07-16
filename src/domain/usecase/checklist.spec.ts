import { UserInMemoryRepository } from "../../../test/repository/user";
import { SystemInMemoryRepository } from "../../../test/repository/system";
import { CreateChecklistUseCase, GetChecklistUseCase } from "./checklist";
import { MockGenerator } from "../../../test/utils/mockGenerator";
import { beforeEach, describe, expect, it } from "vitest";
import { ChecklistInMemoryRepository } from "../../../test/repository/checklist";
import { expectPreConditionalError } from "../../../test/utils/expectPreConditionalError";
import { ChecklistEntity } from "../entity/checklist";

let userRepository: UserInMemoryRepository;
let systemRepository: SystemInMemoryRepository;
let checklistRepository: ChecklistInMemoryRepository;
let mockGenerator: MockGenerator;

describe("Create Checklist Use Case", () => {
  let useCase: CreateChecklistUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    systemRepository = new SystemInMemoryRepository();
    checklistRepository = new ChecklistInMemoryRepository();
    useCase = new CreateChecklistUseCase(
      checklistRepository,
      systemRepository,
      userRepository,
    );
    mockGenerator = new MockGenerator(userRepository, systemRepository);
  });

  it("should create checklist", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      checklistData: mockGenerator.checklistData,
      isGeneral: true,
      isIot: false,
    });

    expect(result.error).toBe(null);
    expect(result.checklist.userId).toBe(user.id);
    expect(result.checklist.systemId).toBe(system.id);
    expect(result.checklist.checklistData).toEqual(mockGenerator.checklistData);
    expect(result.checklist.isGeneral).toBe(true);
    expect(result.checklist.isIot).toBe(false);
    expect(checklistRepository.items[0]).toEqual(result.checklist);
    expect(oldSize).toBe(checklistRepository.items.length - 1);
  });

  it("should not create checklist for inexistent user", async () => {
    const userId = 1;
    const system = await mockGenerator.createSystemMock();

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId,
      systemId: system.id,
      tokenUserId: userId,
      checklistData: mockGenerator.checklistData,
      isGeneral: true,
      isIot: false,
    });

    expectPreConditionalError(result.error);
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for inexistent system", async () => {
    const user = await mockGenerator.createUserMock();
    const systemId = 1;

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId: user.id,
      systemId,
      tokenUserId: user.id,
      checklistData: mockGenerator.checklistData,
      isGeneral: true,
      isIot: false,
    });

    expectPreConditionalError(result.error);
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for user different from authenticated user", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id + 1,
      checklistData: mockGenerator.checklistData,
      isGeneral: true,
      isIot: false,
    });

    expectPreConditionalError(result.error, true);
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for no user", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId: undefined,
      systemId: system.id,
      tokenUserId: user.id,
      checklistData: mockGenerator.checklistData,
      isGeneral: true,
      isIot: false,
    });

    expectPreConditionalError(result.error);
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for no system", async () => {
    const user = await mockGenerator.createUserMock();
    await mockGenerator.createSystemMock();

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId: user.id,
      systemId: undefined,
      tokenUserId: user.id,
      checklistData: mockGenerator.checklistData,
      isGeneral: true,
      isIot: false,
    });

    expectPreConditionalError(result.error);
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for system that doesnt belong to user authenticated", async () => {
    const user1 = await mockGenerator.createUserMock();
    const user2 = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock({ userId: user2.id });

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId: user1.id,
      systemId: system.id,
      tokenUserId: user1.id,
      checklistData: mockGenerator.checklistData,
      isGeneral: true,
      isIot: false,
    });

    expectPreConditionalError(result.error, true);
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist with isGeneral equal to false", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      checklistData: mockGenerator.checklistData,
      isGeneral: false,
      isIot: false,
    });

    expectPreConditionalError(result.error);
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist with checklistData in wrong format", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      checklistData: "oi",
      isGeneral: true,
      isIot: false,
    });

    expectPreConditionalError(result.error);
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });
});

describe("Get Checklist Use Case", () => {
  let useCase: GetChecklistUseCase;

  beforeEach(() => {
    checklistRepository = new ChecklistInMemoryRepository();
    useCase = new GetChecklistUseCase(checklistRepository);
    mockGenerator = new MockGenerator(
      undefined,
      undefined,
      checklistRepository,
    );
  });

  it("should get checklist", async () => {
    const checklist = await mockGenerator.createChecklistMock();

    const result = await useCase.execute({
      id: checklist.id,
      tokenUserId: checklist.userId,
    });

    expect(result.error).toBe(null);
    expect(result.checklist).toBeInstanceOf(ChecklistEntity);
    expect(checklist).toEqual(result.checklist);
  });

  it("should not get inexistent checklist", async () => {
    const id = 1;

    const result = await useCase.execute({
      id,
      tokenUserId: 1,
    });

    expectPreConditionalError(result.error);
    expect(result.checklist).toBe(null);
  });

  it("should not get checklist if checklist doesnt belong to authenticated user", async () => {
    const checklist = await mockGenerator.createChecklistMock();

    const result = await useCase.execute({
      id: checklist.id,
      tokenUserId: 2,
    });

    expectPreConditionalError(result.error, true);
    expect(result.checklist).toBe(null);
  });
});
