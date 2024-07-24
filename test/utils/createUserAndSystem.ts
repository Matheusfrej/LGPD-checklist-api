import request from "supertest";
import express from "express";
import { UserEntity } from "../domain/entity/user";
import { SystemEntity } from "../domain/entity/system";

async function createUserAndSystem(app: express.Application) {
  await request(app).post("/users").send({
    name: "Fulano",
    office: "Desenvolvedor",
    email: "fulano@exemplo.com",
    password: "Teste123!",
  });

  const authResponse = await request(app).post("/login").send({
    email: "fulano@exemplo.com",
    password: "Teste123!",
  });

  const { user, token } = authResponse.body as {
    user: UserEntity;
    token: string;
  };

  const systemResponse = await request(app)
    .post("/systems")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Sistema LGPD",
      description: "Descrição do sistema LGPD",
      userId: user.id,
    });

  const { system } = systemResponse.body as { system: SystemEntity };

  return {
    user,
    token,
    system,
  };
}

export { createUserAndSystem };
