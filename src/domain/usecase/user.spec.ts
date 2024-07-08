import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCaseInMemoryRepository } from "../../../test/repository/user";
import { CreateUserUseCase } from "./user";
import { CreateUserUseCaseValidate } from "../../infrastructure/provider/validate/user";
import { compare } from "bcryptjs";
import { ErrorEntity, PRE_CONDITIONAL_ERROR_CODE } from "../entity/error";

describe("Create User Use Case", () => {
  let repository: CreateUserUseCaseInMemoryRepository;
  let validate: CreateUserUseCaseValidate;
  let useCase: CreateUserUseCase;

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

  it("should hash user password uppon user creation", async () => {
    const result = await useCase.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: "Teste123!",
    });

    const isPasswordCorrectlyHashed = await compare(
      "Teste123!",
      result.user.password,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to create user with same email twice", async () => {
    const email = "fulano@exemplo.com";

    await useCase.createUser({
      name: "Fulano",
      email,
      office: "Desenvolvedor",
      password: "Teste123!",
    });

    const result = await useCase.createUser({
      name: "John Doe",
      email,
      office: "Desenvolvedor",
      password: "Teste123!",
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });

  it("should not be able to create user with weak password", async () => {
    const result = await useCase.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: "123456",
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });
});
