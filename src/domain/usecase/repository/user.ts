import { UserEntity } from "../../entity/user";
import { CreateUserUseCaseRequest, LoginUseCaseRequest } from "../ucio/user";

interface CreateUserUseCaseRepositoryInterface {
  createUser(req: CreateUserUseCaseRequest): Promise<UserEntity>;
}

interface LoginUseCaseRepositoryInterface {
  login(req: LoginUseCaseRequest): Promise<UserEntity>;

  createToken(id: number): string;
}

interface VerifyTokenUseCaseRepositoryInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verifyToken(token: string): any;

  createToken(id: number): string;

  getUser(id: number): Promise<UserEntity>;
}

export {
  CreateUserUseCaseRepositoryInterface,
  LoginUseCaseRepositoryInterface,
  VerifyTokenUseCaseRepositoryInterface,
};
