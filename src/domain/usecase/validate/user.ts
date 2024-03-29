import { CreateUserUseCaseRequest } from "../ucio/user";

interface CreateUserUseCaseValidateInterface {
  createUser(user: CreateUserUseCaseRequest): Promise<string>;
}

export { CreateUserUseCaseValidateInterface };
