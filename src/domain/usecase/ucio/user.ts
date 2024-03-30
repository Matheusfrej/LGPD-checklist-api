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

class LoginUseCaseRequest {
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

class LoginUseCaseResponse {
  public user: UserEntity;
  public token: string;
  public error: ErrorEntity;

  constructor(user: UserEntity, token: string, error: ErrorEntity) {
    this.user = user;
    this.token = token;
    this.error = error;
  }
}

class VerifyTokenUseCaseRequest {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }
}

class VerifyTokenUseCaseResponse {
  public user: UserEntity;
  public token: string;
  public error: ErrorEntity;

  constructor(user: UserEntity, token: string, error: ErrorEntity) {
    this.user = user;
    this.token = token;
    this.error = error;
  }
}

class UpdateUserUseCaseRequest {
  public tokenUserId: number;
  public id: number;
  public name: string;
  public office: string;

  constructor(tokenUserId: number, id: number, name: string, office: string) {
    this.tokenUserId = tokenUserId;
    this.id = id;
    this.name = name;
    this.office = office;
  }
}

class UpdateUserUseCaseResponse {
  public error: ErrorEntity;

  constructor(error: ErrorEntity) {
    this.error = error;
  }
}

export {
  CreateUserUseCaseRequest,
  CreateUserUseCaseResponse,
  LoginUseCaseRequest,
  LoginUseCaseResponse,
  VerifyTokenUseCaseRequest,
  VerifyTokenUseCaseResponse,
  UpdateUserUseCaseRequest,
  UpdateUserUseCaseResponse,
};
