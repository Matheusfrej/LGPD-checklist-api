import { UserEntity } from "../../entity/user";
import {
  CreateUserUseCaseRequest,
  DeleteUserUseCaseRequest,
  LoginUseCaseRequest,
  UpdateUserUseCaseRequest,
} from "../ucio/user";

interface UserRepositoryInterface {
  checkUserByEmailExists(email: string, id: number): Promise<boolean>;
  createUser(req: CreateUserUseCaseRequest): Promise<UserEntity>;
  login(req: LoginUseCaseRequest): Promise<UserEntity>;
  createToken(id: number): string;
  getUser(id: number): Promise<UserEntity>;
  updateUser(req: UpdateUserUseCaseRequest): Promise<UserEntity>;
  deleteUser(req: DeleteUserUseCaseRequest): Promise<void>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verifyToken(token: string): any;
}

export { UserRepositoryInterface };
