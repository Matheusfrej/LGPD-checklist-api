import { UserEntity } from "../../entity/user";
import {
  CreateUserUseCaseRequest,
  LoginUseCaseRequest,
  UpdateUserUseCaseRequest,
} from "../ucio/user";

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

interface UpdateUserUseCaseRepositoryInterface {
  updateUser(req: UpdateUserUseCaseRequest): Promise<UserEntity>;
}

export {
  CreateUserUseCaseRepositoryInterface,
  LoginUseCaseRepositoryInterface,
  VerifyTokenUseCaseRepositoryInterface,
  UpdateUserUseCaseRepositoryInterface,
};
