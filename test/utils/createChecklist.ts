import request from "supertest";
import express from "express";
import { createUserAndSystem } from "./createUserAndSystem";
import { ChecklistEntity } from "../../src/domain/entity/checklist";

export const createChecklist = async (app: express.Application) => {
  const { user, token, system } = await createUserAndSystem(app);

  const response = await request(app)
    .post("/checklists")
    .set("Authorization", `Bearer ${token}`)
    .send({
      userId: user.id,
      systemId: system.id,
      isIot: false,
      items: [
        {
          id: 1,
          answer: "Sim",
          severityDegree: undefined,
          userComment: undefined,
        },
      ],
      laws: [1],
      devices: [],
    });

  const { checklist } = response.body as {
    checklist: ChecklistEntity;
  };

  return {
    user,
    token,
    system,
    checklist,
  };
};
