import { describe, expect, it } from "vitest";
import request from "supertest";
import { restApp } from "../../../../main";
import { createUserAndSystem } from "../../../../../test/utils/createUserAndSystem";
import { PrismaClient } from "@prisma/client";
import { createChecklist } from "../../../../../test/utils/createChecklist";
import { CreateItemUseCaseRequest } from "../../../../domain/usecase/ucio/item";
import { CreateDeviceUseCaseRequest } from "../../../../domain/usecase/ucio/device";
import { CreateLawUseCaseRequest } from "../../../../domain/usecase/ucio/law";

const prisma = new PrismaClient();

const createLaw = async (
  prisma: PrismaClient,
  req: CreateLawUseCaseRequest = {
    name: "LGPD",
  },
) => {
  return await prisma.laws.create({
    data: {
      name: req.name,
    },
  });
};

const createDevice = async (
  prisma: PrismaClient,
  req: CreateDeviceUseCaseRequest = {
    name: "Sensor IoT",
  },
) => {
  return await prisma.devices.create({
    data: {
      name: req.name,
    },
  });
};

const createItem = async (
  prisma: PrismaClient,
  req: CreateItemUseCaseRequest = {
    code: "I-01",
    itemDesc: "itemDesc",
    recommendations: "recommendations",
    isMandatory: true,
    lawsIds: [1],
    devicesIds: [1],
  },
) => {
  return await prisma.items.create({
    data: {
      code: req.code,
      itemDesc: req.itemDesc,
      recommendations: req.recommendations,
      isMandatory: req.isMandatory,
      laws: {
        connect: req.lawsIds.map((id) => ({ id })),
      },
      devices: {
        connect: req.devicesIds.map((id) => ({ id })),
      },
    },
  });
};

describe("Create Checklist (e2e)", () => {
  it("should create checklist", async () => {
    const { user, token, system } = await createUserAndSystem(restApp);

    // só pode criar uma vez, nos outros testes já vai ter criado no banco
    const law = await createLaw(prisma);
    await createDevice(prisma);
    const item = await createItem(prisma);

    const response = await request(restApp)
      .post("/checklists")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: user.id,
        systemId: system.id,
        isIot: false,
        items: [
          {
            id: item.id,
            answer: "Sim",
            severityDegree: undefined,
            userComment: undefined,
          },
        ],
        laws: [law.id],
        devices: [],
      });

    expect(response.statusCode).toBe(200);
  });
});

describe("Get Checklist (e2e)", () => {
  it("should get checklist", async () => {
    const { token, checklist, user, system } = await createChecklist(restApp);

    const response = await request(restApp)
      .get(`/checklists/${checklist.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.checklist.userId).toEqual(user.id);
    expect(response.body.checklist.systemId).toEqual(system.id);
  });
});

describe("Delete Checklist (e2e)", () => {
  it("should delete checklist", async () => {
    const { token, checklist } = await createChecklist(restApp);

    const response = await request(restApp)
      .delete(`/checklists/${checklist.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("Update Checklist (e2e)", () => {
  it("should update checklist", async () => {
    const { token, system, checklist } = await createChecklist(restApp);

    const response = await request(restApp)
      .put(`/checklists/${checklist.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        systemId: system.id,
        items: [
          {
            id: 1,
            answer: "Não",
            severityDegree: "Grave",
            userComment: "Comentário",
          },
        ],
        laws: [1],
        devices: [1],
      });

    expect(response.statusCode).toBe(200);
  });
});

describe("List User Checklists (e2e)", () => {
  it("should list user checklists", async () => {
    const { token, user, system } = await createChecklist(restApp);

    const response = await request(restApp)
      .get(`/checklistsByUserId/${user.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.checklists[0].userId).toBe(user.id);
    expect(response.body.checklists[0].systemId).toBe(system.id);
  });
});

describe("List System Checklists (e2e)", () => {
  it("should list system checklists", async () => {
    const { token, user, system } = await createChecklist(restApp);

    const response = await request(restApp)
      .get(`/checklistsBySystemId/${system.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.checklists[0].userId).toBe(user.id);
    expect(response.body.checklists[0].systemId).toBe(system.id);
  });
});
