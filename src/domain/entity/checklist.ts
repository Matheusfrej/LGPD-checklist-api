import { ChecklistItemEntity } from "./checklistItem";
import { DeviceEntity } from "./device";
import { LawEntity } from "./law";

class ChecklistEntity {
  public id: number;
  public userId: number;
  public systemId: number;
  public checklistItems?: ChecklistItemEntity[];
  public laws?: LawEntity[];
  public devices?: DeviceEntity[];
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(
    id: number,
    userId: number,
    systemId: number,
    checklistItems?: ChecklistItemEntity[],
    laws?: LawEntity[],
    devices?: DeviceEntity[],
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.systemId = systemId;
    this.checklistItems = checklistItems;
    this.laws = laws;
    this.devices = devices;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export { ChecklistEntity };
