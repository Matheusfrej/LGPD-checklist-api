import { DeviceEntity } from "./device";
import { LawEntity } from "./law";

class ItemEntity {
  public id: number;
  public code: string;
  public itemDesc: string;
  public recommendations: string;
  public isMandatory: boolean;
  public laws?: LawEntity[];
  public devices?: DeviceEntity[];

  constructor(
    id: number,
    code: string,
    itemDesc: string,
    recommendations: string,
    isMandatory: boolean,
    laws?: LawEntity[],
    devices?: DeviceEntity[],
  ) {
    this.id = id;
    this.code = code;
    this.itemDesc = itemDesc;
    this.recommendations = recommendations;
    this.isMandatory = isMandatory;
    this.laws = laws;
    this.devices = devices;
  }
}

export { ItemEntity };
