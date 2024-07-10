import { beforeEach, describe, expect, it } from "vitest";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
  LoginUseCase,
  UpdateUserUseCase,
  VerifyTokenUseCase,
} from "./user";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import {
  ErrorEntity,
  NO_PERMISSION_MESSAGE,
  PRE_CONDITIONAL_ERROR_CODE,
} from "../entity/error";
import { UserInMemoryRepository } from "../../../test/repository/user";
import { AuthFakeRepository } from "../../../test/repository/auth";
import { UserEntity } from "../entity/user";

let userRepository: UserInMemoryRepository;
let authRepository: AuthFakeRepository;

describe("Create User Use Case", () => {
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    useCase = new CreateUserUseCase(userRepository);
  });

  it("should create user", async () => {
    const oldSize = userRepository.items.length;

    const result = await useCase.execute({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: "Teste123!",
    });

    expect(result.error).toBe(null);
    expect(result.user.id).toEqual(expect.any(Number));
    expect(userRepository.items[0]).toEqual(result.user);
    expect(oldSize).toBe(userRepository.items.length - 1);
  });

  it("should hash user password uppon user creation", async () => {
    const result = await useCase.execute({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: "Teste123!",
    });

    const isPasswordCorrectlyHashed = compareSync(
      "Teste123!",
      result.user.password,
    );

    expect(result.error).toBe(null);
    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not create user with same email twice", async () => {
    const email = "fulano@exemplo.com";

    await useCase.execute({
      name: "Fulano",
      email,
      office: "Desenvolvedor",
      password: "Teste123!",
    });

    const result = await useCase.execute({
      name: "John Doe",
      email,
      office: "Desenvolvedor",
      password: "Teste123!",
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });

  it("should not create user with weak password", async () => {
    const result = await useCase.execute({
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
  let useCase: LoginUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    authRepository = new AuthFakeRepository();
    useCase = new LoginUseCase(userRepository, authRepository);
  });

  it("should authenticate", async () => {
    await userRepository.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    });

    const result = await useCase.execute({
      email: "fulano@exemplo.com",
      password: "Teste123!",
    });

    expect(result.error).toBe(null);
    expect(result.user.id).toEqual(expect.any(Number));
  });

  it("should not authenticate with wrong email", async () => {
    const result = await useCase.execute({
      email: "fulano@exemplo.com",
      password: "Teste123!",
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });

  it("should not authenticate with wrong password", async () => {
    await userRepository.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    });

    const result = await useCase.execute({
      email: "fulano@exemplo.com",
      password: "123Teste!",
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });

  it("should create token when authenticate", async () => {
    await userRepository.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    });

    const result = await useCase.execute({
      email: "fulano@exemplo.com",
      password: "Teste123!",
    });

    expect(result.error).toBe(null);
    expect(result.token).toEqual(expect.any(String));
  });
});

describe("Verify Token Use Case", () => {
  let useCase: VerifyTokenUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    authRepository = new AuthFakeRepository();
    useCase = new VerifyTokenUseCase(userRepository, authRepository);
  });

  it("should verify token and authenticate", async () => {
    await userRepository.createUser({
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    });

    const token = "1";

    const result = await useCase.execute({ token });

    expect(result.error).toBe(null);
    expect(result.token).toEqual(expect.any(String));
    expect(result.user).toBeInstanceOf(UserEntity);
    expect(result.user.id).toBe(+token);
  });

  it("should not authenticate when user doesn't exist", async () => {
    const token = "1";

    const result = await useCase.execute({ token });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });

  it("should not authenticate with invalid token", async () => {
    const token = "invalid token";

    const result = await useCase.execute({ token });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });
});

describe("Update User Use Case", () => {
  let useCase: UpdateUserUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    useCase = new UpdateUserUseCase(userRepository);
  });

  it("should update user", async () => {
    const oldUser = {
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    };
    const id = 1;

    await userRepository.createUser(oldUser);

    const oldSize = userRepository.items.length;

    const result = await useCase.execute({
      id,
      tokenUserId: id,
      name: "Cicrano",
      office: "Analista de Tecnologia",
    });

    const userUpdated = userRepository.items.find((item) => item.id === id);

    expect(result.error).toBe(null);
    expect(userUpdated).toBeInstanceOf(UserEntity);
    expect(userUpdated.name).toBe("Cicrano");
    expect(userUpdated.office).toBe("Analista de Tecnologia");
    expect(oldUser).not.toEqual(userUpdated);
    expect(oldSize).toBe(userRepository.items.length);
    expect(userUpdated.email).toBe(oldUser.email);
    expect(userUpdated.password).toBe(oldUser.password);
  });

  it("should update only name of user", async () => {
    const office = "Desenvolvedor";
    const newName = "Cicrano";
    const id = 1;

    const oldUser = {
      name: "Fulano",
      email: "fulano@exemplo.com",
      office,
      password: hashSync("Teste123!", genSaltSync(11)),
    };

    await userRepository.createUser(oldUser);

    const oldSize = userRepository.items.length;

    const result = await useCase.execute({
      id,
      tokenUserId: id,
      name: newName,
      office,
    });

    const userUpdated = userRepository.items.find((item) => item.id === 1);

    expect(result.error).toBe(null);
    expect(userUpdated).toBeInstanceOf(UserEntity);
    expect(userUpdated.name).toBe(newName);
    expect(oldUser).not.toEqual(userUpdated);
    expect(oldSize).toBe(userRepository.items.length);
    expect(userUpdated.email).toBe(oldUser.email);
    expect(userUpdated.office).toBe(oldUser.office);
    expect(userUpdated.password).toBe(oldUser.password);
  });

  it("should update only office of user", async () => {
    const name = "Fulano";
    const newOffice = "Analista de Tecnologia";
    const id = 1;

    const oldUser = {
      name,
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    };

    await userRepository.createUser(oldUser);

    const oldSize = userRepository.items.length;

    const result = await useCase.execute({
      id,
      tokenUserId: id,
      name,
      office: newOffice,
    });

    const userUpdated = userRepository.items.find((item) => item.id === 1);

    expect(result.error).toBe(null);
    expect(userUpdated).toBeInstanceOf(UserEntity);
    expect(userUpdated.office).toBe(newOffice);
    expect(oldUser).not.toEqual(userUpdated);
    expect(oldSize).toBe(userRepository.items.length);
    expect(userUpdated.name).toBe(oldUser.name);
    expect(userUpdated.email).toBe(oldUser.email);
    expect(userUpdated.password).toBe(oldUser.password);
  });

  it("should not update user with wrong id in token", async () => {
    const oldUser = {
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    };

    await userRepository.createUser(oldUser);

    const result = await useCase.execute({
      id: 1,
      tokenUserId: 2,
      name: "Cicrano",
      office: "Analista de Tecnologia",
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
    expect(result.error.message).toBe(NO_PERMISSION_MESSAGE);
    expect(oldUser).toEqual({
      ...userRepository.items[0],
      id: undefined,
    });
  });

  it("should not update inexistent user", async () => {
    const result = await useCase.execute({
      id: 1,
      tokenUserId: 1,
      name: "Fulano",
      office: "Cicrano",
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
  });
});

describe("Get User Use Case", () => {
  let useCase: GetUserUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    useCase = new GetUserUseCase(userRepository);
  });

  it("should get user", async () => {
    const user = {
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    };
    const id = 1;

    await userRepository.createUser(user);

    const result = await useCase.execute({
      id,
    });

    expect(result.error).toBe(null);
    expect(result.user).toBeInstanceOf(UserEntity);
    expect(user).toEqual({ ...result.user, id: undefined });
  });

  it("should not get inexistent user", async () => {
    const id = 1;

    const result = await useCase.execute({
      id,
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
    expect(result.user).toBe(null);
  });
});

describe("Delete User Use Case", () => {
  let useCase: DeleteUserUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    useCase = new DeleteUserUseCase(userRepository);
  });

  it("should delete user", async () => {
    const user = {
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    };
    const id = 1;

    await userRepository.createUser(user);

    const oldSize = userRepository.items.length;

    const result = await useCase.execute({
      id,
      tokenUserId: id,
    });

    expect(result.error).toBe(null);
    expect(userRepository.items.length).toBe(0);
    expect(userRepository.items.length).toBe(oldSize - 1);
  });

  it("should not delete inexistent user", async () => {
    const id = 1;

    const result = await useCase.execute({
      id,
      tokenUserId: id,
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
    expect(userRepository.items.length).toBe(0);
  });

  it("should not delete user with wrong id on token", async () => {
    const user = {
      name: "Fulano",
      email: "fulano@exemplo.com",
      office: "Desenvolvedor",
      password: hashSync("Teste123!", genSaltSync(11)),
    };

    await userRepository.createUser(user);

    const result = await useCase.execute({
      id: 1,
      tokenUserId: 2,
    });

    expect(result.error).toBeInstanceOf(ErrorEntity);
    expect(result.error.code).toBe(PRE_CONDITIONAL_ERROR_CODE);
    expect(result.error.message).toBe(NO_PERMISSION_MESSAGE);
    expect(userRepository.items.length).toBe(1);
  });
});
