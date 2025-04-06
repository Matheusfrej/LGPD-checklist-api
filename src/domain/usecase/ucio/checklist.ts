import { Json } from "../../@types";
import { ChecklistEntity } from "../../entity/checklist";
import { AnswerType, SeverityDegreeType } from "../../entity/checklistItem";
import { ErrorEntity } from "../../entity/error";
import { BaseResponse } from "./common";

type ItemsInput = {
  id: number;
  answer: AnswerType;
  severityDegree: SeverityDegreeType;
  userComment?: string;
}[];

export type CreateChecklistUseCaseRequest = {
  tokenUserId: number;
  userId: number;
  systemId: number;
  items: ItemsInput;
};

export type CreateChecklistUseCaseResponse = BaseResponse & {
  checklist: ChecklistEntity;
};

export type GetChecklistUseCaseRequest = {
  tokenUserId: number;
  id: number;
};

export type GetChecklistUseCaseResponse = BaseResponse & {
  checklist: ChecklistEntity;
};

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
  public checklistData: Json;
  public isGeneral?: boolean;
  public isIot?: boolean;

  constructor(
    id: number,
    tokenUserId: number,
    systemId: number,
    checklistData: Json,
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

class ListChecklistsByUserIdUseCaseRequest {
  public tokenUserId: number;
  public userId: number;

  constructor(tokenUserId: number, userId: number) {
    this.tokenUserId = tokenUserId;
    this.userId = userId;
  }
}

class ListChecklistsByUserIdUseCaseResponse {
  public checklists: ChecklistEntity[];
  public error: ErrorEntity;

  constructor(checklists: ChecklistEntity[], error: ErrorEntity) {
    this.checklists = checklists;
    this.error = error;
  }
}

class ListChecklistsBySystemIdUseCaseRequest {
  public tokenUserId: number;
  public systemId: number;

  constructor(tokenUserId: number, systemId: number) {
    this.tokenUserId = tokenUserId;
    this.systemId = systemId;
  }
}

class ListChecklistsBySystemIdUseCaseResponse {
  public checklists: ChecklistEntity[];
  public error: ErrorEntity;

  constructor(checklists: ChecklistEntity[], error: ErrorEntity) {
    this.checklists = checklists;
    this.error = error;
  }
}

export {
  DeleteChecklistUseCaseRequest,
  DeleteChecklistUseCaseResponse,
  UpdateChecklistUseCaseRequest,
  UpdateChecklistUseCaseResponse,
  ListChecklistsByUserIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseResponse,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsBySystemIdUseCaseResponse,
};
