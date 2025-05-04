import { beforeEach, describe, expect, it } from "vitest";
// import { expectPreConditionalError } from "../../../test/utils/expectPreConditionalError";
import { MockGenerator } from "../../../test/utils/mockGenerator";
import { testFactory } from "../../../test/factory";
import { ListLawsUseCase } from "./law";
import { LawRepositoryInterface } from "./repository/law";

let lawRepository: LawRepositoryInterface;
let mockGenerator: MockGenerator;

describe("List Laws Use Case", () => {
  let useCase: ListLawsUseCase;

  beforeEach(() => {
    lawRepository = testFactory.makeLawRepository();
    useCase = new ListLawsUseCase(lawRepository);
    mockGenerator = new MockGenerator(null, null, null, null, lawRepository);
  });

  it("should list laws", async () => {
    const oldSize = lawRepository.items.length;

    const law1 = await mockGenerator.createLawMock();
    const law2 = await mockGenerator.createLawMock({
      id: law1.id + 1,
      name: "GDPR",
    });

    const result = await useCase.execute();

    expect(result.error).toBe(null);
    expect(result.laws.length).toBe(oldSize + 2);
    expect(result.laws).toContain(law1);
    expect(result.laws).toContain(law2);
  });

  it("should return an empty list when there is no laws", async () => {
    const oldSize = lawRepository.items.length;

    const result = await useCase.execute();

    expect(result.error).toBe(null);
    expect(result.laws.length).toBe(oldSize);
  });
});
