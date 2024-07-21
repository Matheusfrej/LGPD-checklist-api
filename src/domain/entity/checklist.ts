import { Json } from "../@types";

class ChecklistEntity {
  public id: number;
  public userId: number;
  public systemId: number;
  public checklistData: Json;
  public isGeneral?: boolean;
  public isIot?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(
    id: number,
    userId: number,
    systemId: number,
    checklistData: Json,
    isGeneral?: boolean,
    isIot?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.systemId = systemId;
    this.checklistData = checklistData;
    this.isGeneral = isGeneral;
    this.isIot = isIot;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { ChecklistEntity };
