import { describe, expect, it } from "vitest";
import request from "supertest";
import { restApp } from "../../../../main";

describe("List Devices (e2e)", () => {
  it("should list devices", async () => {
    const response = await request(restApp).get("/devices");
    expect(response.statusCode).toBe(200);
  });
});
