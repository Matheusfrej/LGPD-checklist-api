import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCase, LoginUseCase } from "./user";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { ErrorEntity, PRE_CONDITIONAL_ERROR_CODE } from "../entity/error";
import { UserInMemoryRepository } from "../../../test/repository/user";
import {
  CreateUserUseCaseValidate,
  LoginUseCaseValidate,
} from "../../infrastructure/provider/validate/user";

describe("Create User Use Case", () => {
  let repository: UserInMemoryRepository;
  let validate: CreateUserUseCaseValidate;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
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

    const isPasswordCorrectlyHashed = compareSync(
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

describe("Login Use Case", () => {
  let repository: UserInMemoryRepository;
  let validate: LoginUseCaseValidate;
  let useCase: LoginUseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    validate = new LoginUseCaseValidate();
    useCase = new LoginUseCase(validate, repository);
  });

  it("should be able to authenticate", async () => {
    await repository.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    });

    const result = await useCase.login({
      email: "fulano@exemplo.com",
      password: "Teste123!",
    });

    expect(result.user.id).toEqual(expect.any(Number));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const result = await useCase.login({
      email: "fulano@exemplo.com",
      password: "Teste123!",
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await repository.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    });

    const result = await useCase.login({
      email: "fulano@exemplo.com",
      password: "123Teste!",
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });

  it("should create token when authenticate", async () => {
    await repository.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    });

    const result = await useCase.login({
      email: "fulano@exemplo.com",
      password: "Teste123!",
    });

    expect(result.token).toEqual(expect.any(String));
  });
});
