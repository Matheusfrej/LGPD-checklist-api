import { SystemEntity } from "../../entity/system";
import { ErrorEntity } from "../../entity/error";

class CreateSystemUseCaseRequest {
  public name: string;
  public description: string;
  public userId: number;
  public tokenUserId: number;

  constructor(
    name: string,
    description: string,
    userId: number,
    tokenUserId: number,
  ) {
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.tokenUserId = tokenUserId;
  }
}

class CreateSystemUseCaseResponse {
  public system: SystemEntity;
  public error: ErrorEntity;

  constructor(system: SystemEntity, error: ErrorEntity) {
    this.system = system;
    this.error = error;
  }
}

class ListSystemsByUserIdUseCaseRequest {
  public tokenUserId: number;
  public userId: number;

  constructor(tokenUserId: number, userId: number) {
    this.tokenUserId = tokenUserId;
    this.userId = userId;
  }
}

class ListSystemsByUserIdUseCaseResponse {
  public systems: SystemEntity[];
  public error: ErrorEntity;

  constructor(systems: SystemEntity[], error: ErrorEntity) {
    this.systems = systems;
    this.error = error;
  }
}

class GetSystemUseCaseRequest {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }
}

class GetSystemUseCaseResponse {
  public system: SystemEntity;
  public error: ErrorEntity;

  constructor(system: SystemEntity, error: ErrorEntity) {
    this.system = system;
    this.error = error;
  }
}

class DeleteSystemUseCaseRequest {
  public tokenUserId: number;
  public id: number;

  constructor(id: number, tokenUserId: number) {
    this.id = id;
    this.tokenUserId = tokenUserId;
  }
}

class DeleteSystemUseCaseResponse {
  public error: ErrorEntity;

  constructor(error: ErrorEntity) {
    this.error = error;
  }
}

class UpdateSystemUseCaseRequest {
  public id: number;
  public name: string;
  public description: string;
  public tokenUserId: number;

  constructor(
    id: number,
    name: string,
    description: string,
    tokenUserId: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.tokenUserId = tokenUserId;
  }
}

class UpdateSystemUseCaseResponse {
  public error: ErrorEntity;

  constructor(error: ErrorEntity) {
    this.error = error;
  }
}

export {
  CreateSystemUseCaseRequest,
  CreateSystemUseCaseResponse,
  ListSystemsByUserIdUseCaseRequest,
  ListSystemsByUserIdUseCaseResponse,
  GetSystemUseCaseRequest,
  GetSystemUseCaseResponse,
  DeleteSystemUseCaseRequest,
  DeleteSystemUseCaseResponse,
  UpdateSystemUseCaseRequest,
  UpdateSystemUseCaseResponse,
};
