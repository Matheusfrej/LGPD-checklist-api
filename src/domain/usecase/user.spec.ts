import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCaseInMemoryRepository } from "../../../test/repository/user";
import { CreateUserUseCase } from "./user";
import { CreateUserUseCaseValidate } from "../../infrastructure/provider/validate/user";

let repository: CreateUserUseCaseInMemoryRepository;
let validate: CreateUserUseCaseValidate;
let useCase: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    repository = new CreateUserUseCaseInMemoryRepository();
    validate = new CreateUserUseCaseValidate();
    useCase = new CreateUserUseCase(validate, repository);
  });

  it("should create user", async () => {
    const result = await useCase.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: "Teste123!",
    });

    expect(result.error).toBe(null);
    expect(result.user.id).toEqual(expect.any(Number));
    expect(repository.items[0]).toEqual(result.user);
  });
});
