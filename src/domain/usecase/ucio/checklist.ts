/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChecklistEntity } from "../../entity/checklist";
import { ErrorEntity } from "../../entity/error";

class CreateChecklistUseCaseRequest {
  public tokenUserId: number;
  public userId: number;
  public systemId: number;
  public checklistData: any;
  public isGeneral?: boolean;
  public isIot?: boolean;

  constructor(
    tokenUserId: number,
    userId: number,
    systemId: number,
    checklistData: any,
    isGeneral?: boolean,
    isIot?: boolean,
  ) {
    this.tokenUserId = tokenUserId;
    this.userId = userId;
    this.systemId = systemId;
    this.checklistData = checklistData;
    this.isGeneral = isGeneral;
    this.isIot = isIot;
  }
}

class CreateChecklistUseCaseResponse {
  public checklist: ChecklistEntity;
  public error: ErrorEntity;

  constructor(checklist: ChecklistEntity, error: ErrorEntity) {
    this.checklist = checklist;
    this.error = error;
  }
}

class GetChecklistUseCaseRequest {
  public tokenUserId: number;
  public id: number;

  constructor(tokenUserId: number, id: number) {
    this.tokenUserId = tokenUserId;
    this.id = id;
  }
}

class GetChecklistUseCaseResponse {
  public checklist: ChecklistEntity;
  public error: ErrorEntity;

  constructor(checklist: ChecklistEntity, error: ErrorEntity) {
    this.checklist = checklist;
    this.error = error;
  }
}

class DeleteChecklistUseCaseRequest {
  public tokenUserId: number;
  public id: number;

  constructor(tokenUserId: number, id: number) {
    this.tokenUserId = tokenUserId;
    this.id = id;
  }
}

class DeleteChecklistUseCaseResponse {
  public error: ErrorEntity;

  constructor(error: ErrorEntity) {
    this.error = error;
  }
}

class UpdateChecklistUseCaseRequest {
  public id: number;
  public tokenUserId: number;
  public systemId: number;
  public checklistData: any;
  public isGeneral?: boolean;
  public isIot?: boolean;

  constructor(
    id: number,
    tokenUserId: number,
    systemId: number,
    checklistData: any,
    isGeneral?: boolean,
    isIot?: boolean,
  ) {
    this.id = id;
    this.tokenUserId = tokenUserId;
    this.systemId = systemId;
    this.checklistData = checklistData;
    this.isGeneral = isGeneral;
    this.isIot = isIot;
  }
}

class UpdateChecklistUseCaseResponse {
  public error: ErrorEntity;

  constructor(error: ErrorEntity) {
    this.error = error;
  }
}

export {
  CreateChecklistUseCaseRequest,
  CreateChecklistUseCaseResponse,
  GetChecklistUseCaseRequest,
  GetChecklistUseCaseResponse,
  DeleteChecklistUseCaseRequest,
  DeleteChecklistUseCaseResponse,
  UpdateChecklistUseCaseRequest,
  UpdateChecklistUseCaseResponse,
};
