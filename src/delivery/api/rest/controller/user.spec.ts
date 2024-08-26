import { describe, expect, it } from "vitest";
import request from "supertest";
import { restApp } from "../../../../main";
import { createAndAuthenticateUser } from "../../../../../test/utils/createAndAuthenticateUser";
import { UserEntity } from "../../../../domain/entity/user";

const userDummy: UserEntity = {
  id: undefined,
  name: "Fulano",
  office: "Desenvolvedor",
  email: "fulano@exemplo.com",
  password: "Teste123!",
};

describe("Create User (e2e)", () => {
  it("should register", async () => {
    const response = await request(restApp).post("/users").send(userDummy);

    expect(response.statusCode).toBe(200);
  });
});

describe("Login (e2e)", () => {
  it("should login", async () => {
    await request(restApp).post("/users").send(userDummy);

    const response = await request(restApp).post("/login").send({
      email: userDummy.email,
      password: userDummy.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: userDummy.email,
      }),
    );
  });
});

describe("Verify Token (e2e)", () => {
  it("should verify token", async () => {
    await request(restApp).post("/users").send(userDummy);

    const authResponse = await request(restApp).post("/login").send({
      email: userDummy.email,
      password: userDummy.password,
    });

    const token = authResponse.body.token;

    const response = await request(restApp)
      .get("/token")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toEqual(expect.any(String));
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: userDummy.email,
      }),
    );
  });
});

describe("Update User (e2e)", () => {
  it("should update user", async () => {
    const { user, token } = await createAndAuthenticateUser(restApp);

    const response = await request(restApp)
      .put(`/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: user.name + " da Silva",
        office: user.office + "  de Software",
      });

    expect(response.statusCode).toBe(200);
  });
});

describe("Get User (e2e)", () => {
  it("should get user", async () => {
    const { user, token } = await createAndAuthenticateUser(restApp);

    const response = await request(restApp)
      .get(`/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: user.email,
      }),
    );
  });
});

describe("Delete User (e2e)", () => {
  it("should delete user", async () => {
    const { user, token } = await createAndAuthenticateUser(restApp);

    const response = await request(restApp)
      .delete(`/users/${user.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
});
