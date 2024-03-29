import { ErrorEntity } from "../../entity/error";
import { UserEntity } from "../../entity/user";

class CreateUserUseCaseRequest {
  public name: string;
  public office: string;
  public email: string;
  public password: string;

  constructor(name: string, office: string, email: string, password: string) {
    this.name = name;
    this.office = office;
    this.email = email;
    this.password = password;
  }
}

class CreateUserUseCaseResponse {
  public user: UserEntity;
  public error: ErrorEntity;

  constructor(user: UserEntity, error: ErrorEntity) {
    this.user = user;
    this.error = error;
  }
}

export { CreateUserUseCaseRequest, CreateUserUseCaseResponse };
