import {
  CreateChecklistUseCase,
  DeleteChecklistUseCase,
  GetChecklistUseCase,
  ListChecklistsBySystemIdUseCase,
  ListChecklistsByUserIdUseCase,
  UpdateChecklistUseCase,
} from "./checklist";
import { MockGenerator } from "../../../test/utils/mockGenerator";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { expectPreConditionalError } from "../../../test/utils/expectPreConditionalError";
import { ChecklistEntity } from "../entity/checklist";
import { Json } from "../@types";
import { afterEach } from "node:test";
import {
  AnswerType,
  ChecklistItemEntity,
  SeverityDegreeType,
} from "../entity/checklistItem";
import { testFactory } from "../../../test/factory";
import { UserRepositoryInterface } from "./repository/user";
import { SystemRepositoryInterface } from "./repository/system";
import { ChecklistRepositoryInterface } from "./repository/checklist";
import { ItemRepositoryInterface } from "./repository/item";

let userRepository: UserRepositoryInterface;
let systemRepository: SystemRepositoryInterface;
let checklistRepository: ChecklistRepositoryInterface;
let itemRepository: ItemRepositoryInterface;
let mockGenerator: MockGenerator;

describe("Create Checklist Use Case", () => {
  let useCase: CreateChecklistUseCase;

  beforeEach(() => {
    userRepository = testFactory.makeUserRepository();
    systemRepository = testFactory.makeSystemRepository();
    checklistRepository = testFactory.makeChecklistRepository();
    itemRepository = testFactory.makeItemRepository();
    useCase = new CreateChecklistUseCase(
      checklistRepository,
      systemRepository,
      userRepository,
      itemRepository,
    );
    mockGenerator = new MockGenerator(
      userRepository,
      systemRepository,
      null,
      itemRepository,
    );
  });

  it("should create checklist", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      items: [
        {
          id: item.id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expect(result.error).toBe(null);
    expect(result.checklist.userId).toBe(user.id);
    expect(result.checklist.systemId).toBe(system.id);
    expect(result.checklist.checklistItems[0].item.id).toBe(item.id);
    expect(result.checklist.checklistItems[0].answer).toBe(answer);
    expect(checklistRepository.items[0]).toEqual(result.checklist);
    expect(oldSize).toBe(checklistRepository.items.length - 1);
  });

  it("should not create checklist for inexistent user", async () => {
    const userId = 1;
    const system = await mockGenerator.createSystemMock();
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId,
      systemId: system.id,
      tokenUserId: userId,
      items: [
        {
          id: item.id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for inexistent system", async () => {
    const user = await mockGenerator.createUserMock();
    const systemId = 1;
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: user.id,
      systemId,
      tokenUserId: user.id,
      items: [
        {
          id: item.id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for inexistent item", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    const itemId = 1;

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      items: [
        {
          id: itemId,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(result.error.message).toContain(itemId);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for two inexistent itens", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    const item = await mockGenerator.createItemMock();
    const itemIds = [item.id, 2];

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      items: itemIds.map((id) => {
        return {
          id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        };
      }),
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(result.error.message).toContain(itemIds[itemIds.length - 1]);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for one existent item and the other inexistent", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    const itemIds = [1, 2];

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      items: itemIds.map((id) => {
        return {
          id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        };
      }),
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(result.error.message).toContain(itemIds.join(", "));
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist when validation error on item answer", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer: AnswerType = "Não";

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      items: [
        {
          id: item.id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist when validation error on item answer part 2", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer: AnswerType = "Não";
    const severityDegree: SeverityDegreeType = "Catastrófico";

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      items: [
        {
          id: item.id,
          answer,
          severityDegree,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should create checklist when answer No in item and item correctly filled", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer: AnswerType = "Não";
    const severityDegree: SeverityDegreeType = "Catastrófico";
    const userComment = "Comentário";

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      items: [
        {
          id: item.id,
          answer,
          severityDegree,
          userComment,
        },
      ],
    });

    expect(result.error).toBe(null);
    expect(result.checklist.userId).toBe(user.id);
    expect(result.checklist.systemId).toBe(system.id);
    expect(result.checklist.checklistItems[0].item.id).toBe(item.id);
    expect(result.checklist.checklistItems[0].answer).toBe(answer);
    expect(result.checklist.checklistItems[0].severityDegree).toBe(
      severityDegree,
    );
    expect(result.checklist.checklistItems[0].userComment).toBe(userComment);
    expect(checklistRepository.items[0]).toEqual(result.checklist);
    expect(oldSize).toBe(checklistRepository.items.length - 1);
  });

  it("should not create checklist for no item id", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: undefined,
      systemId: system.id,
      tokenUserId: user.id,
      items: [
        {
          id: undefined,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for no item", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id,
      items: [],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for user different from authenticated user", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: user.id,
      systemId: system.id,
      tokenUserId: user.id + 1,
      items: [
        {
          id: item.id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for no user", async () => {
    const user = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock();
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: undefined,
      systemId: system.id,
      tokenUserId: user.id,
      items: [
        {
          id: item.id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for no system", async () => {
    const user = await mockGenerator.createUserMock();
    await mockGenerator.createSystemMock();
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: user.id,
      systemId: undefined,
      tokenUserId: user.id,
      items: [
        {
          id: item.id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });

  it("should not create checklist for system that doesnt belong to user authenticated", async () => {
    const user1 = await mockGenerator.createUserMock();
    const user2 = await mockGenerator.createUserMock();
    const system = await mockGenerator.createSystemMock({ userId: user2.id });
    const item = await mockGenerator.createItemMock();

    const oldSize = checklistRepository.items.length;

    const answer = "Sim";

    const result = await useCase.execute({
      userId: user1.id,
      systemId: system.id,
      tokenUserId: user1.id,
      items: [
        {
          id: item.id,
          answer,
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
    expect(result.checklist).toBe(null);
    expect(oldSize).toBe(checklistRepository.items.length);
  });
});

describe("Get Checklist Use Case", () => {
  let useCase: GetChecklistUseCase;

  beforeEach(() => {
    checklistRepository = testFactory.makeChecklistRepository();
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

    expectPreConditionalError({ error: result.error });
    expect(result.checklist).toBe(null);
  });

  it("should not get checklist if checklist doesnt belong to authenticated user", async () => {
    const checklist = await mockGenerator.createChecklistMock();

    const result = await useCase.execute({
      id: checklist.id,
      tokenUserId: 2,
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
    expect(result.checklist).toBe(null);
  });
});

describe("Delete Checklist Use Case", () => {
  let useCase: DeleteChecklistUseCase;

  beforeEach(() => {
    checklistRepository = testFactory.makeChecklistRepository();
    useCase = new DeleteChecklistUseCase(checklistRepository);
    mockGenerator = new MockGenerator(
      undefined,
      undefined,
      checklistRepository,
    );
  });

  it("should delete checklist", async () => {
    const checklist = await mockGenerator.createChecklistMock();

    const oldSize = checklistRepository.items.length;

    const result = await useCase.execute({
      id: checklist.id,
      tokenUserId: checklist.userId,
    });

    expect(result.error).toBe(null);
    expect(checklistRepository.items.length).toBe(0);
    expect(checklistRepository.items.length).toBe(oldSize - 1);
  });

  it("should not delete inexistent checklist", async () => {
    const id = 1;

    const result = await useCase.execute({
      id,
      tokenUserId: 1,
    });

    expectPreConditionalError({ error: result.error });
    expect(checklistRepository.items.length).toBe(0);
  });

  it("should not delete checklist if checklist doesnt belong to authenticated user", async () => {
    const checklist = await mockGenerator.createChecklistMock();

    const result = await useCase.execute({
      id: checklist.id,
      tokenUserId: 2,
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
    expect(checklistRepository.items.length).toBe(1);
  });
});

// describe("Update Checklist Use Case", () => {
//   let useCase: UpdateChecklistUseCase;

//   beforeEach(() => {
//     checklistRepository = testFactory.makeChecklistRepository();
//     systemRepository = testFactory.makeSystemRepository();
//     useCase = new UpdateChecklistUseCase(checklistRepository, systemRepository);
//     mockGenerator = new MockGenerator(
//       undefined,
//       systemRepository,
//       checklistRepository,
//     );

//     vi.useFakeTimers();
//   });

//   afterEach(() => {
//     vi.useRealTimers();
//   });

//   it("should update checklist", async () => {
//     const system1 = await mockGenerator.createSystemMock();

//     const oldChecklist = {
//       ...(await mockGenerator.createChecklistMock({ systemId: system1.id })),
//     };

//     const system2 = await mockGenerator.createSystemMock();

//     const newChecklistData: Json = { message: "hey" };
//     const newIsIot = !oldChecklist.isIot;

//     const oldSize = checklistRepository.items.length;

//     const result = await useCase.execute({
//       id: oldChecklist.id,
//       checklistData: newChecklistData,
//       systemId: system2.id,
//       tokenUserId: oldChecklist.userId,
//       isGeneral: oldChecklist.isGeneral,
//       isIot: newIsIot,
//     });

//     const checklistUpdated = checklistRepository.items.find(
//       (item) => item.id === oldChecklist.id,
//     );

//     expect(result.error).toBe(null);
//     expect(checklistUpdated).toBeInstanceOf(ChecklistEntity);
//     expect(checklistUpdated.checklistData).toEqual(newChecklistData);
//     expect(checklistUpdated.checklistData).not.toEqual(
//       oldChecklist.checklistData,
//     );
//     expect(checklistUpdated.systemId).toBe(system2.id);
//     expect(checklistUpdated.isGeneral).toBe(oldChecklist.isGeneral);
//     expect(checklistUpdated.isIot).toBe(newIsIot);
//     expect(checklistUpdated.userId).toBe(oldChecklist.userId);
//     expect(oldChecklist).not.toEqual(checklistUpdated);
//     expect(oldSize).toBe(checklistRepository.items.length);
//     expect(checklistUpdated.id).toBe(oldChecklist.id);
//   });

//   it("should be able to update only checklistData", async () => {
//     vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

//     const system = await mockGenerator.createSystemMock();

//     const oldChecklist = {
//       ...(await mockGenerator.createChecklistMock({ systemId: system.id })),
//     };
//     const newChecklistData: Json = { message: "hey" };

//     const oldSize = checklistRepository.items.length;

//     const result = await useCase.execute({
//       id: oldChecklist.id,
//       checklistData: newChecklistData,
//       systemId: system.id,
//       tokenUserId: oldChecklist.userId,
//       isGeneral: oldChecklist.isGeneral,
//       isIot: oldChecklist.isIot,
//     });

//     const checklistUpdated = checklistRepository.items.find(
//       (item) => item.id === oldChecklist.id,
//     );

//     expect(result.error).toBe(null);
//     expect(checklistUpdated).toBeInstanceOf(ChecklistEntity);
//     expect(checklistUpdated.checklistData).toEqual(newChecklistData);
//     expect({
//       ...checklistUpdated,
//       checklistData: undefined,
//     }).toEqual({
//       ...oldChecklist,
//       checklistData: undefined,
//     });
//     expect(oldChecklist).not.toEqual(checklistUpdated);
//     expect(oldSize).toBe(checklistRepository.items.length);
//     expect(checklistUpdated.id).toBe(oldChecklist.id);
//   });

//   it("should be able to update only systemId", async () => {
//     vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

//     const system1 = await mockGenerator.createSystemMock();

//     const oldChecklist = {
//       ...(await mockGenerator.createChecklistMock({ systemId: system1.id })),
//     };

//     const system2 = await mockGenerator.createSystemMock();

//     const oldSize = checklistRepository.items.length;

//     const result = await useCase.execute({
//       id: oldChecklist.id,
//       checklistData: oldChecklist.checklistData,
//       systemId: system2.id,
//       tokenUserId: oldChecklist.userId,
//       isGeneral: oldChecklist.isGeneral,
//       isIot: oldChecklist.isIot,
//     });

//     const checklistUpdated = checklistRepository.items.find(
//       (item) => item.id === oldChecklist.id,
//     );

//     expect(result.error).toBe(null);
//     expect(checklistUpdated).toBeInstanceOf(ChecklistEntity);
//     expect(checklistUpdated.systemId).toBe(system2.id);
//     expect({
//       ...checklistUpdated,
//       systemId: undefined,
//     }).toEqual({
//       ...oldChecklist,
//       systemId: undefined,
//     });
//     expect(oldChecklist).not.toEqual(checklistUpdated);
//     expect(oldSize).toBe(checklistRepository.items.length);
//     expect(checklistUpdated.id).toBe(oldChecklist.id);
//   });

//   it("should be able to update only isIot", async () => {
//     vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

//     const system = await mockGenerator.createSystemMock();

//     const oldChecklist = {
//       ...(await mockGenerator.createChecklistMock({ systemId: system.id })),
//     };

//     const newIsIot = !oldChecklist.isIot;

//     const oldSize = checklistRepository.items.length;

//     const result = await useCase.execute({
//       id: oldChecklist.id,
//       checklistData: oldChecklist.checklistData,
//       systemId: system.id,
//       tokenUserId: oldChecklist.userId,
//       isGeneral: oldChecklist.isGeneral,
//       isIot: newIsIot,
//     });

//     const checklistUpdated = checklistRepository.items.find(
//       (item) => item.id === oldChecklist.id,
//     );

//     expect(result.error).toBe(null);
//     expect(checklistUpdated).toBeInstanceOf(ChecklistEntity);
//     expect(checklistUpdated.isIot).toBe(newIsIot);
//     expect({
//       ...checklistUpdated,
//       isIot: undefined,
//     }).toEqual({
//       ...oldChecklist,
//       isIot: undefined,
//     });
//     expect(oldChecklist).not.toEqual(checklistUpdated);
//     expect(oldSize).toBe(checklistRepository.items.length);
//     expect(checklistUpdated.id).toBe(oldChecklist.id);
//   });

//   it("should not update inexistent checklist", async () => {
//     const system = await mockGenerator.createSystemMock();

//     const result = await useCase.execute({
//       id: 1,
//       checklistData: mockGenerator.checklistData,
//       systemId: system.id,
//       tokenUserId: 1,
//       isGeneral: true,
//       isIot: false,
//     });

//     expectPreConditionalError({ error: result.error });
//   });

//   it("should not update checklist to system that doesnt exist", async () => {
//     const checklist = {
//       ...(await mockGenerator.createChecklistMock()),
//     };

//     const result = await useCase.execute({
//       id: checklist.id,
//       checklistData: mockGenerator.checklistData,
//       systemId: 1,
//       tokenUserId: checklist.userId,
//       isGeneral: true,
//       isIot: false,
//     });

//     expectPreConditionalError({ error: result.error });
//   });

//   it("should not update checklist from user that is different from authenticated user", async () => {
//     const checklist = {
//       ...(await mockGenerator.createChecklistMock()),
//     };
//     const system = await mockGenerator.createSystemMock();

//     const result = await useCase.execute({
//       id: checklist.id,
//       checklistData: mockGenerator.checklistData,
//       systemId: system.id,
//       tokenUserId: checklist.userId + 1,
//       isGeneral: true,
//       isIot: false,
//     });

//     expectPreConditionalError({ error: result.error, noPermission: true });
//   });

//   it("should not update checklist from system that belongs to user different from authenticated user", async () => {
//     const checklist = {
//       ...(await mockGenerator.createChecklistMock()),
//     };
//     const system = await mockGenerator.createSystemMock({
//       userId: checklist.userId + 1,
//     });

//     const result = await useCase.execute({
//       id: checklist.id,
//       checklistData: mockGenerator.checklistData,
//       systemId: system.id,
//       tokenUserId: checklist.userId,
//       isGeneral: true,
//       isIot: false,
//     });

//     expectPreConditionalError({ error: result.error, noPermission: true });
//   });
// });

describe("List User Checklists Use Case", () => {
  let useCase: ListChecklistsByUserIdUseCase;

  beforeEach(() => {
    checklistRepository = testFactory.makeChecklistRepository();
    systemRepository = testFactory.makeSystemRepository();
    userRepository = testFactory.makeUserRepository();
    useCase = new ListChecklistsByUserIdUseCase(
      checklistRepository,
      userRepository,
    );
    mockGenerator = new MockGenerator(
      userRepository,
      systemRepository,
      checklistRepository,
    );
  });

  it("should list user checklists", async () => {
    // system 1 and 2 belong to user 1
    const { user: user1, system: system1 } =
      await mockGenerator.createUserAndSystemMock();
    const system2 = await mockGenerator.createSystemMock({ userId: user1.id });

    // system 3 belongs to user 2
    const user2 = await mockGenerator.createUserMock();
    const system3 = await mockGenerator.createSystemMock({
      userId: user2.id,
      tokenUserId: user2.id,
    });

    // checklists from user 1
    const checklist1 = await mockGenerator.createChecklistMock({
      userId: user1.id,
      systemId: system1.id,
    });
    const checklist2 = await mockGenerator.createChecklistMock({
      userId: user1.id,
      systemId: system2.id,
    });

    // checklist from user 2
    await mockGenerator.createChecklistMock({
      userId: user2.id,
      systemId: system3.id,
    });

    const result = await useCase.execute({
      userId: user1.id,
      tokenUserId: user1.id,
    });

    expect(result.error).toBe(null);
    expect(result.checklists[0]).toEqual(checklist1);
    expect(result.checklists[1]).toEqual(checklist2);
    expect(result.checklists.length).toBe(checklistRepository.items.length - 1);

    result.checklists.forEach((checklist) => {
      expect(checklist.userId).toBe(user1.id);
    });
  });

  it("should list empty list when user doesnt have checklists", async () => {
    const user = await mockGenerator.createUserMock();

    const result = await useCase.execute({
      userId: user.id,
      tokenUserId: user.id,
    });

    expect(result.error).toBe(null);
    expect(result.checklists.length).toBe(0);
  });

  it("should not list checklists when user authenticated is different from user", async () => {
    const user = await mockGenerator.createUserMock();

    const result = await useCase.execute({
      userId: user.id,
      tokenUserId: user.id + 1,
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
  });

  it("should not list checklists from inexistent user", async () => {
    const userId = 1;

    const result = await useCase.execute({
      userId,
      tokenUserId: userId,
    });

    expectPreConditionalError({ error: result.error, noPermission: false });
  });
});

describe("List System Checklists Use Case", () => {
  let useCase: ListChecklistsBySystemIdUseCase;

  beforeEach(() => {
    checklistRepository = testFactory.makeChecklistRepository();
    systemRepository = testFactory.makeSystemRepository();
    userRepository = testFactory.makeUserRepository();
    useCase = new ListChecklistsBySystemIdUseCase(
      checklistRepository,
      systemRepository,
    );
    mockGenerator = new MockGenerator(
      userRepository,
      systemRepository,
      checklistRepository,
    );
  });

  it("should list system checklists", async () => {
    const { user, system: system1 } =
      await mockGenerator.createUserAndSystemMock();
    const system2 = await mockGenerator.createSystemMock({ userId: user.id });

    // checklists from system 1
    const checklist1 = await mockGenerator.createChecklistMock({
      userId: user.id,
      systemId: system1.id,
    });
    const checklist2 = await mockGenerator.createChecklistMock({
      userId: user.id,
      systemId: system1.id,
    });

    // checklist from system 2
    await mockGenerator.createChecklistMock({
      userId: user.id,
      systemId: system2.id,
    });

    // list system 1 checklists
    const result = await useCase.execute({
      systemId: system1.id,
      tokenUserId: user.id,
    });

    expect(result.error).toBe(null);
    expect(result.checklists[0]).toEqual(checklist1);
    expect(result.checklists[1]).toEqual(checklist2);
    expect(result.checklists.length).toBe(checklistRepository.items.length - 1);

    result.checklists.forEach((checklist) => {
      expect(checklist.systemId).toBe(system1.id);
    });
    result.checklists.forEach((checklist) => {
      expect(checklist.userId).toBe(user.id);
    });
  });

  it("should return empty list when system doesnt have checklists", async () => {
    const system = await mockGenerator.createSystemMock();

    const result = await useCase.execute({
      systemId: system.id,
      tokenUserId: system.userId,
    });

    expect(result.error).toBe(null);
    expect(result.checklists.length).toBe(0);
  });

  it("should not list checklists when system belongs to user different from authenticated user", async () => {
    const { user, system } = await mockGenerator.createUserAndSystemMock();

    const result = await useCase.execute({
      systemId: system.id,
      tokenUserId: user.id + 1,
    });

    expectPreConditionalError({ error: result.error, noPermission: true });
  });

  it("should not list checklists from inexistent system", async () => {
    const systemId = 1;
    const user = await mockGenerator.createUserMock();

    const result = await useCase.execute({
      systemId,
      tokenUserId: user.id,
    });

    expectPreConditionalError({ error: result.error, noPermission: false });
  });
});
