import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import {
  closeRestServer,
  restApp,
  waitUntilRestIsReady,
} from "../../../../main";

describe("Create User (e2e)", () => {
  beforeAll(async () => {
    await waitUntilRestIsReady();
  });

  afterAll(async () => {
    await closeRestServer();
  });

  it("should be able to register", async () => {
    const response = await request(restApp).post("/users").send({
      name: "Fulano",
      office: "Desenvolvedor",
      email: "fulano@exemplo.com",
      password: "Teste123!",
    });

    expect(response.statusCode).toBe(200);
  });
});
