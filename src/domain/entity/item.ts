import { DeviceEntity } from "./device";
import { LawEntity } from "./law";
import { SectionEntity } from "./section";

export class ItemEntity {
  public id: number;
  public code: string;
  public itemDesc: string;
  public recommendations: string;
  public isMandatory: boolean;
  public sectionId: number;
  public section?: SectionEntity;
  public laws?: LawEntity[];
  public devices?: DeviceEntity[];

  constructor(
    id: number,
    code: string,
    itemDesc: string,
    recommendations: string,
    isMandatory: boolean,
    sectionId: number,
    section?: SectionEntity,
    laws?: LawEntity[],
    devices?: DeviceEntity[],
  ) {
    this.id = id;
    this.code = code;
    this.itemDesc = itemDesc;
    this.recommendations = recommendations;
    this.isMandatory = isMandatory;
    this.sectionId = sectionId;
    this.section = section;
    this.laws = laws;
    this.devices = devices;
  }
}
