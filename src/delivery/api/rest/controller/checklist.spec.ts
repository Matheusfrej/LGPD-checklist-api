import { describe, expect, it } from "vitest";
import request from "supertest";
import { restApp } from "../../../../main";
import { createUserAndSystem } from "../../../../../test/utils/createUserAndSystem";
import { PrismaClient } from "@prisma/client";
import { createChecklist } from "../../../../../test/utils/createChecklist";
import { createLaw } from "../../../../../test/utils/createLaw";
import { createDevice } from "../../../../../test/utils/createDevice";
import { createItem } from "../../../../../test/utils/createItem";
import { createSection } from "../../../../../test/utils/createSection";

const prisma = new PrismaClient();

describe("Create Checklist (e2e)", () => {
  it("should create checklist", async () => {
    const { user, token, system } = await createUserAndSystem(restApp);

    // só pode criar uma vez, nos outros testes dessa suite já vai ter criado no banco
    const law = await createLaw(prisma);
    await createDevice(prisma);
    await createSection(prisma);
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
