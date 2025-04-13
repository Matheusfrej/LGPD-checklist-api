import { ChecklistEntity } from "../../entity/checklist";
import { AnswerType, SeverityDegreeType } from "../../entity/checklistItem";
import { BaseResponse, UserAuthenticated } from "./common";

type ItemsInput = {
  id: number;
  answer: AnswerType;
  severityDegree: SeverityDegreeType;
  userComment?: string;
}[];

export type CreateChecklistUseCaseRequest = UserAuthenticated & {
  userId: number;
  systemId: number;
  items: ItemsInput;
};

export type CreateChecklistUseCaseResponse = BaseResponse & {
  checklist: ChecklistEntity;
};

export type GetChecklistUseCaseRequest = UserAuthenticated & {
  id: number;
};

export type GetChecklistUseCaseResponse = BaseResponse & {
  checklist: ChecklistEntity;
};

export type DeleteChecklistUseCaseRequest = UserAuthenticated & {
  id: number;
};

export type DeleteChecklistUseCaseResponse = BaseResponse;

export type UpdateChecklistUseCaseRequest = UserAuthenticated & {
  id: number;
  systemId: number;
  items: ItemsInput;
};

export type UpdateChecklistUseCaseResponse = BaseResponse;

export type ListChecklistsByUserIdUseCaseRequest = UserAuthenticated & {
  userId: number;
};

export type ListChecklistsByUserIdUseCaseResponse = BaseResponse & {
  checklists: ChecklistEntity[];
};

export type ListChecklistsBySystemIdUseCaseRequest = UserAuthenticated & {
  systemId: number;
};

export type ListChecklistsBySystemIdUseCaseResponse = BaseResponse & {
  checklists: ChecklistEntity[];
};
