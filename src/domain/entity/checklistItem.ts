import { ChecklistEntity } from "./checklist";
import { ItemEntity } from "./item";

export type AnswerType = "Sim" | "Não" | "Não se aplica" | undefined;
export const answerTypeArray = ["Sim", "Não", "Não se aplica"] as const;

export type SeverityDegreeType = "Leve" | "Grave" | "Catastrófico" | undefined;
export const severityDegreeTypeArray = [
  "Leve",
  "Grave",
  "Catastrófico",
] as const;

class ChecklistItemEntity {
  public checklist: ChecklistEntity;
  public item: ItemEntity;
  public answer?: AnswerType;
  public severityDegree?: SeverityDegreeType;
  public userComment?: string;

  constructor(
    checklist: ChecklistEntity,
    item: ItemEntity,
    answer?: AnswerType,
    severityDegree?: SeverityDegreeType,
    userComment?: string,
  ) {
    this.checklist = checklist;
    this.item = item;
    this.answer = answer;
    this.severityDegree = severityDegree;
    this.userComment = userComment;
  }
}

export { ChecklistItemEntity };
