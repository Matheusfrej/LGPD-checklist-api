import { ChecklistEntity } from "./checklist";
import { ItemEntity } from "./item";

class ChecklistItemEntity {
  public checklist: ChecklistEntity;
  public item: ItemEntity;
  public answer?: string;
  public severityDegree?: string;
  public userComment?: string;

  constructor(
    checklist: ChecklistEntity,
    item: ItemEntity,
    answer?: string,
    severityDegree?: string,
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
