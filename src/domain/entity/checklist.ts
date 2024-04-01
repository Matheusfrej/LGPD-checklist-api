/* eslint-disable @typescript-eslint/no-explicit-any */
class ChecklistEntity {
  public id: number;
  public userId: number;
  public systemId: number;
  public checklistData: any;
  public isGeneral?: boolean;
  public isIot?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(
    id: number,
    userId: number,
    systemId: number,
    checklistData: any,
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
