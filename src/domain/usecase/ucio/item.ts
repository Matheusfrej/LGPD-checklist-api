import { DeviceEntity } from "../../entity/device";
import { ItemEntity } from "../../entity/item";
import { LawEntity } from "../../entity/law";
import { BaseResponse } from "./common";

export type CreateItemUseCaseRequest = {
  code: string;
  itemDesc: string;
  recommendations: string;
  isMandatory: boolean;
  sectionId: number;
  lawsIds: number[];
  devicesIds: number[];
};

export type ListItemsUseCaseRequest = {
  laws: LawEntity["id"][];
  devices: DeviceEntity["id"][];
};

export type ListItemsUseCaseResponse = BaseResponse & {
  items: ItemEntity[];
};
