import { describe, expect, it } from "vitest";
import request from "supertest";
import { restApp } from "../../../../main";

describe("List Laws (e2e)", () => {
  it("should list laws", async () => {
    const response = await request(restApp).get("/laws");

    expect(response.statusCode).toBe(200);
  });
});
