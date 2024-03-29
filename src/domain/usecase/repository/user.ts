import { UserEntity } from "../../entity/user";
import { CreateUserUseCaseRequest } from "../ucio/user";

interface CreateUserUseCaseRepositoryInterface {
  createUser(user: CreateUserUseCaseRequest): Promise<UserEntity>;
}

export { CreateUserUseCaseRepositoryInterface };
