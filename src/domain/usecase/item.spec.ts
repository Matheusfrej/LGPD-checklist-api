import { beforeEach, describe, expect, it } from "vitest";
import { expectPreConditionalError } from "../../../test/utils/expectPreConditionalError";
import { MockGenerator } from "../../../test/utils/mockGenerator";
import { testFactory } from "../../../test/factory";
import { LawRepositoryInterface } from "./repository/law";
import { DeviceRepositoryInterface } from "./repository/device";
import { ItemRepositoryInterface } from "./repository/item";
import { ListItemsUseCase } from "./item";

let itemRepository: ItemRepositoryInterface;
let lawRepository: LawRepositoryInterface;
let deviceRepository: DeviceRepositoryInterface;
let mockGenerator: MockGenerator;

describe("List Items Use Case", () => {
  let useCase: ListItemsUseCase;

  beforeEach(() => {
    itemRepository = testFactory.makeItemRepository();
    lawRepository = testFactory.makeLawRepository();
    deviceRepository = testFactory.makeDeviceRepository();
    useCase = new ListItemsUseCase(
      itemRepository,
      lawRepository,
      deviceRepository,
    );
    mockGenerator = new MockGenerator(
      null,
      null,
      null,
      itemRepository,
      lawRepository,
      deviceRepository,
    );
  });

  it("should list items", async () => {
    const oldSize = itemRepository.items.length;

    const law = await mockGenerator.createLawMock();

    const item1 = await mockGenerator.createItemMock({
      code: "I-01",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law.id],
      devicesIds: [],
    });
    const item2 = await mockGenerator.createItemMock({
      code: "I-02",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law.id],
      devicesIds: [],
    });

    const result = await useCase.execute({
      laws: [law.id],
      devices: [],
    });

    expect(result.error).toBe(null);
    expect(result.items.length).toBe(oldSize + 2);
    expect(result.items).toContain(item1);
    expect(result.items).toContain(item2);
  });

  it("should return an empty list when there is no item", async () => {
    const oldSize = itemRepository.items.length;
    const law = await mockGenerator.createLawMock();

    const result = await useCase.execute({
      laws: [law.id],
      devices: [],
    });

    expect(result.error).toBe(null);
    expect(result.items.length).toBe(oldSize);
  });

  it("should not list items without requested laws", async () => {
    const oldSize = itemRepository.items.length;

    const law1 = await mockGenerator.createLawMock();
    const law2 = await mockGenerator.createLawMock();

    const item1 = await mockGenerator.createItemMock({
      code: "I-01",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law1.id],
      devicesIds: [],
    });
    const item2 = await mockGenerator.createItemMock({
      code: "I-02",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law1.id, law2.id],
      devicesIds: [],
    });

    const result = await useCase.execute({
      laws: [law2.id],
      devices: [],
    });

    expect(result.error).toBe(null);
    expect(result.items.length).toBe(oldSize + 1);
    expect(result.items).not.toContain(item1);
    expect(result.items).toContain(item2);
  });

  it("should list all items with at least one requested law", async () => {
    const oldSize = itemRepository.items.length;

    const law1 = await mockGenerator.createLawMock();
    const law2 = await mockGenerator.createLawMock();

    const item1 = await mockGenerator.createItemMock({
      code: "I-01",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law1.id],
      devicesIds: [],
    });
    const item2 = await mockGenerator.createItemMock({
      code: "I-02",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law2.id],
      devicesIds: [],
    });

    const result = await useCase.execute({
      laws: [law1.id, law2.id],
      devices: [],
    });

    expect(result.error).toBe(null);
    expect(result.items.length).toBe(oldSize + 2);
    expect(result.items).toContain(item1);
    expect(result.items).toContain(item2);
  });

  it("should not list items when requested laws array is empty", async () => {
    const law1 = await mockGenerator.createLawMock();
    const law2 = await mockGenerator.createLawMock();

    await mockGenerator.createItemMock({
      code: "I-01",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law1.id],
      devicesIds: [],
    });
    await mockGenerator.createItemMock({
      code: "I-02",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law2.id],
      devicesIds: [],
    });

    const result = await useCase.execute({
      laws: [],
      devices: [],
    });

    expectPreConditionalError({ error: result.error });
    expect(result.items).toBe(null);
  });

  it("should not list items without requested devices", async () => {
    const oldSize = itemRepository.items.length;

    const law1 = await mockGenerator.createLawMock();
    const law2 = await mockGenerator.createLawMock();

    const device1 = await mockGenerator.createDeviceMock();
    const device2 = await mockGenerator.createDeviceMock();

    const item1 = await mockGenerator.createItemMock({
      code: "I-01",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law1.id],
      devicesIds: [device1.id],
    });
    const item2 = await mockGenerator.createItemMock({
      code: "I-02",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law2.id],
      devicesIds: [device1.id, device2.id],
    });

    const result = await useCase.execute({
      laws: [law1.id, law2.id],
      devices: [device2.id],
    });

    expect(result.error).toBe(null);
    expect(result.items.length).toBe(oldSize + 1);
    expect(result.items).not.toContain(item1);
    expect(result.items).toContain(item2);
  });

  it("should list all items with at least one requested device", async () => {
    const oldSize = itemRepository.items.length;

    const law1 = await mockGenerator.createLawMock();
    const law2 = await mockGenerator.createLawMock();

    const device1 = await mockGenerator.createDeviceMock();
    const device2 = await mockGenerator.createDeviceMock();

    const item1 = await mockGenerator.createItemMock({
      code: "I-01",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law1.id],
      devicesIds: [device1.id],
    });
    const item2 = await mockGenerator.createItemMock({
      code: "I-02",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law2.id],
      devicesIds: [device2.id],
    });

    const result = await useCase.execute({
      laws: [law1.id, law2.id],
      devices: [device1.id, device2.id],
    });

    expect(result.error).toBe(null);
    expect(result.items.length).toBe(oldSize + 2);
    expect(result.items).toContain(item1);
    expect(result.items).toContain(item2);
  });

  it("should list empty items when there is a requested law that any item contains", async () => {
    const oldSize = itemRepository.items.length;

    const law1 = await mockGenerator.createLawMock();
    const law2 = await mockGenerator.createLawMock();
    const law3 = await mockGenerator.createLawMock();

    const device1 = await mockGenerator.createDeviceMock();
    const device2 = await mockGenerator.createDeviceMock();

    const item1 = await mockGenerator.createItemMock({
      code: "I-01",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law1.id],
      devicesIds: [device1.id],
    });
    const item2 = await mockGenerator.createItemMock({
      code: "I-02",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law2.id],
      devicesIds: [device2.id],
    });

    const result = await useCase.execute({
      laws: [law3.id],
      devices: [],
    });

    expect(result.error).toBe(null);
    expect(result.items.length).toBe(oldSize);
    expect(result.items).not.toContain(item1);
    expect(result.items).not.toContain(item2);
  });

  it("should list empty items when there items have devices but request asks for no device", async () => {
    const oldSize = itemRepository.items.length;

    const law1 = await mockGenerator.createLawMock();
    const law2 = await mockGenerator.createLawMock();

    const device1 = await mockGenerator.createDeviceMock();
    const device2 = await mockGenerator.createDeviceMock();

    const item1 = await mockGenerator.createItemMock({
      code: "I-01",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law1.id],
      devicesIds: [device1.id],
    });
    const item2 = await mockGenerator.createItemMock({
      code: "I-02",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law2.id],
      devicesIds: [device2.id],
    });

    const result = await useCase.execute({
      laws: [law1.id, law2.id],
      devices: [],
    });

    expect(result.error).toBe(null);
    expect(result.items.length).toBe(oldSize);
    expect(result.items).not.toContain(item1);
    expect(result.items).not.toContain(item2);
  });

  it("should list empty items when there items have devices but request asks for no device", async () => {
    const oldSize = itemRepository.items.length;

    const law1 = await mockGenerator.createLawMock();
    const law2 = await mockGenerator.createLawMock();

    const device1 = await mockGenerator.createDeviceMock();
    const device2 = await mockGenerator.createDeviceMock();

    const item1 = await mockGenerator.createItemMock({
      code: "I-01",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law1.id],
      devicesIds: [],
    });
    const item2 = await mockGenerator.createItemMock({
      code: "I-02",
      itemDesc: "descricao",
      recommendations: "recommendations",
      isMandatory: true,
      lawsIds: [law2.id],
      devicesIds: [device2.id],
    });

    const result = await useCase.execute({
      laws: [law1.id, law2.id],
      devices: [device1.id, device2.id],
    });

    expect(result.error).toBe(null);
    expect(result.items.length).toBe(oldSize + 2);
    expect(result.items).toContain(item1);
    expect(result.items).toContain(item2);
  });
});
