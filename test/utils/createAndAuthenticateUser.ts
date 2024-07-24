import request from "supertest";
import express from "express";
import { UserEntity } from "../domain/entity/user";

async function createAndAuthenticateUser(app: express.Application) {
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

  return {
    user,
    token,
  };
}

export { createAndAuthenticateUser };
