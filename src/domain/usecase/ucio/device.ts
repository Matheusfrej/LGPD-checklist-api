import { DeviceEntity } from "../../entity/device";
import { BaseResponse } from "./common";

export type CreateDeviceUseCaseRequest = {
  name: string;
};

export type ListDevicesUseCaseResponse = BaseResponse & {
  devices: DeviceEntity[];
};
