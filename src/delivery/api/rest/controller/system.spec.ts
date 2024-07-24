import { describe, expect, it } from "vitest";
import request from "supertest";
import { restApp } from "../../../../main";
import { createAndAuthenticateUser } from "../../../../../test/utils/createAndAuthenticateUser";
import { SystemEntity } from "../../../../domain/entity/system";

const systemDummy: SystemEntity = {
  id: undefined,
  userId: undefined,
  name: "Sistema LGPD",
  description: "Descrição do sistema LGPD",
};

describe("Create System (e2e)", () => {
  it("should create system", async () => {
    const { user, token } = await createAndAuthenticateUser(restApp);

    const response = await request(restApp)
      .post("/systems")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...systemDummy, userId: user.id });

    expect(response.statusCode).toBe(200);
  });
});

describe("List User Systems (e2e)", () => {
  it("should list user systems", async () => {
    const { user, token } = await createAndAuthenticateUser(restApp);

    const systemResponse = await request(restApp)
      .post("/systems")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...systemDummy, userId: user.id });

    const response = await request(restApp)
      .get(`/systemsByUserId/${user.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.systems[0]).toEqual(systemResponse.body.system);
    expect(response.body.systems[0].userId).toBe(user.id);
  });
});

describe("Get System (e2e)", () => {
  it("should get system", async () => {
    const { user, token } = await createAndAuthenticateUser(restApp);

    const systemResponse = await request(restApp)
      .post("/systems")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...systemDummy, userId: user.id });

    const response = await request(restApp).get(
      `/systems/${systemResponse.body.system.id}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.system.userId).toEqual(user.id);
  });
});

describe("Delete System (e2e)", () => {
  it("should delete system", async () => {
    const { user, token } = await createAndAuthenticateUser(restApp);

    const systemResponse = await request(restApp)
      .post("/systems")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...systemDummy, userId: user.id });

    const response = await request(restApp)
      .delete(`/systems/${systemResponse.body.system.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});

describe("Update System (e2e)", () => {
  it("should update system", async () => {
    const { user, token } = await createAndAuthenticateUser(restApp);

    const systemResponse = await request(restApp)
      .post("/systems")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...systemDummy, userId: user.id });

    const response = await request(restApp)
      .put(`/systems/${systemResponse.body.system.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: systemDummy.name + " Alterado",
        description: "Nova " + systemDummy.description,
      });

    expect(response.statusCode).toBe(200);
  });
});
