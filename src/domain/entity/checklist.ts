import { ChecklistItemEntity } from "./checklistItem";

class ChecklistEntity {
  public id: number;
  public userId: number;
  public systemId: number;
  public checklistItems?: ChecklistItemEntity[];
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(
    id: number,
    userId: number,
    systemId: number,
    checklistItems?: ChecklistItemEntity[],
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.systemId = systemId;
    this.checklistItems = checklistItems;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { ChecklistEntity };
