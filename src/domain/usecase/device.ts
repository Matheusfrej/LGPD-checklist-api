import { DeviceRepositoryInterface } from "./repository/device";
import * as ucio from "../usecase/ucio/device";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  newInternalServerError,
  TAG_INTERNAL_SERVER_ERROR,
} from "../entity/error";

export class ListDevicesUseCase {
  private deviceRepository: DeviceRepositoryInterface;

  constructor(deviceRepository: DeviceRepositoryInterface) {
    this.deviceRepository = deviceRepository;
  }

  async execute(): Promise<ucio.ListDevicesUseCaseResponse> {
    try {
      const devices = await this.deviceRepository.list();
      return {
        devices,
        error: null,
      };
    } catch (error) {
      console.log(`${TAG_INTERNAL_SERVER_ERROR} ${error}`);
      return {
        devices: null,
        error: newInternalServerError(INTERNAL_SERVER_ERROR_MESSAGE),
      };
    }
  }
}
