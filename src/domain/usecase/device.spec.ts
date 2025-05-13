import { beforeEach, describe, expect, it } from "vitest";
// import { expectPreConditionalError } from "../../../test/utils/expectPreConditionalError";
import { MockGenerator } from "../../../test/utils/mockGenerator";
import { testFactory } from "../../../test/factory";
import { ListDevicesUseCase } from "./device";
import { DeviceRepositoryInterface } from "./repository/device";

let deviceRepository: DeviceRepositoryInterface;
let mockGenerator: MockGenerator;

describe("List Devices Use Case", () => {
  let useCase: ListDevicesUseCase;

  beforeEach(() => {
    deviceRepository = testFactory.makeDeviceRepository();
    useCase = new ListDevicesUseCase(deviceRepository);
    mockGenerator = new MockGenerator(
      null,
      null,
      null,
      null,
      null,
      deviceRepository,
    );
  });

  it("should list devices", async () => {
    const oldSize = deviceRepository.items.length;

    const device1 = await mockGenerator.createDeviceMock();
    const device2 = await mockGenerator.createDeviceMock({
      id: device1.id + 1,
      name: "Sensor IoT LORA",
    });

    const result = await useCase.execute();

    expect(result.error).toBe(null);
    expect(result.devices.length).toBe(oldSize + 2);
    expect(result.devices).toContain(device1);
    expect(result.devices).toContain(device2);
  });

  it("should return an empty list when there are no devices", async () => {
    const oldSize = deviceRepository.items.length;

    const result = await useCase.execute();

    expect(result.error).toBe(null);
    expect(result.devices.length).toBe(oldSize);
  });
});
