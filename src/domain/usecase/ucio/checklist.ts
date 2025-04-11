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

export type DeleteChecklistUseCaseRequest = {
  tokenUserId: number;
  id: number;
};

export type DeleteChecklistUseCaseResponse = BaseResponse & {
  error: ErrorEntity;
};

export type UpdateChecklistUseCaseRequest = {
  id: number;
  tokenUserId: number;
  systemId: number;
  checklistData: Json;
  isGeneral?: boolean;
  isIot?: boolean;
};

export type UpdateChecklistUseCaseResponse = BaseResponse & {
  error: ErrorEntity;
};

export type ListChecklistsByUserIdUseCaseRequest = {
  tokenUserId: number;
  userId: number;
};

export type ListChecklistsByUserIdUseCaseResponse = BaseResponse & {
  checklists: ChecklistEntity[];
  error: ErrorEntity;
};

export type ListChecklistsBySystemIdUseCaseRequest = {
  tokenUserId: number;
  systemId: number;
};

export type ListChecklistsBySystemIdUseCaseResponse = BaseResponse & {
  checklists: ChecklistEntity[];
  error: ErrorEntity;
};
