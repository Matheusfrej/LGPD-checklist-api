import { describe, expect, it } from "vitest";
import request from "supertest";
import { restApp } from "../../../../main";
import { createLaw } from "../../../../../test/utils/createLaw";
import { createDevice } from "../../../../../test/utils/createDevice";
import { createItem } from "../../../../../test/utils/createItem";
import { createSection } from "../../../../../test/utils/createSection";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("List Items (e2e)", () => {
  it("should list items", async () => {
    const law1 = await createLaw(prisma);
    const law2 = await createLaw(prisma);
    const device = await createDevice(prisma);
    const section = await createSection(prisma);

    await createItem(prisma, {
      code: "I-01",
      itemDesc: "itemDesc",
      recommendations: "recommendations",
      isMandatory: true,
      sectionId: section.id,
      lawsIds: [law1.id, law2.id],
      devicesIds: [],
    });

    const response = await request(restApp).get(
      `/items?laws=${law1.id},${law2.id}&devices=${device.id}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.items.length).toBe(1);
  });
});
