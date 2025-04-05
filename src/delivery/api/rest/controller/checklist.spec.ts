import { describe, expect, it } from "vitest";
import request from "supertest";
import { restApp } from "../../../../main";
import { createUserAndSystem } from "../../../../../test/utils/createUserAndSystem";
import { ChecklistEntity } from "../../../../domain/entity/checklist";

const checklistDummy: ChecklistEntity = {
  id: undefined,
  userId: undefined,
  systemId: undefined,
};

// TODO: tem que ter modo administrador para ajeitar esses testes integrados
// describe("Create Checklist (e2e)", () => {
//   it("should create checklist", async () => {
//     const { user, token, system } = await createUserAndSystem(restApp);

//     const response = await request(restApp)
//       .post("/checklists")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         ...checklistDummy,
//         userId: user.id,
//         systemId: system.id,
//         isIot: false,
//       });

//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("Get Checklist (e2e)", () => {
//   it("should get checklist", async () => {
//     const { user, token, system } = await createUserAndSystem(restApp);

//     const checklistResponse = await request(restApp)
//       .post("/checklists")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         ...checklistDummy,
//         userId: user.id,
//         systemId: system.id,
//         isIot: false,
//       });

//     const response = await request(restApp)
//       .get(`/checklists/${checklistResponse.body.checklist.id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.checklist.userId).toEqual(user.id);
//     expect(response.body.checklist.systemId).toEqual(system.id);
//   });
// });

// describe("Delete Checklist (e2e)", () => {
//   it("should delete checklist", async () => {
//     const { user, token, system } = await createUserAndSystem(restApp);

//     const checklistResponse = await request(restApp)
//       .post("/checklists")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         ...checklistDummy,
//         userId: user.id,
//         systemId: system.id,
//         isIot: false,
//       });

//     const response = await request(restApp)
//       .delete(`/checklists/${checklistResponse.body.checklist.id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("Update Checklist (e2e)", () => {
//   it("should update checklist", async () => {
//     const { user, token, system } = await createUserAndSystem(restApp);

//     const checklistResponse = await request(restApp)
//       .post("/checklists")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         ...checklistDummy,
//         userId: user.id,
//         systemId: system.id,
//         isIot: false,
//       });

//     const response = await request(restApp)
//       .put(`/checklists/${checklistResponse.body.checklist.id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         ...checklistDummy,
//         systemId: system.id,
//         isIot: true,
//       });

//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("List User Checklists (e2e)", () => {
//   it("should list user checklists", async () => {
//     const { user, token, system } = await createUserAndSystem(restApp);

//     await request(restApp)
//       .post("/checklists")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         ...checklistDummy,
//         userId: user.id,
//         systemId: system.id,
//         isIot: false,
//       });

//     const response = await request(restApp)
//       .get(`/checklistsByUserId/${user.id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.checklists[0].userId).toBe(user.id);
//     expect(response.body.checklists[0].systemId).toBe(system.id);
//   });
// });

// describe("List System Checklists (e2e)", () => {
//   it("should list system checklists", async () => {
//     const { user, token, system } = await createUserAndSystem(restApp);

//     await request(restApp)
//       .post("/checklists")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         ...checklistDummy,
//         userId: user.id,
//         systemId: system.id,
//         isIot: false,
//       });

//     const response = await request(restApp)
//       .get(`/checklistsBySystemId/${system.id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.checklists[0].userId).toBe(user.id);
//     expect(response.body.checklists[0].systemId).toBe(system.id);
//   });
// });
