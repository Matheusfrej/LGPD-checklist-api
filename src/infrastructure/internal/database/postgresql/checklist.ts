import { ChecklistEntity } from "../../../../domain/entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../../../../domain/usecase/ucio/checklist";
import { prisma } from "../../connection/prisma";
import { ItemEntity } from "../../../../domain/entity/item";
import { LawEntity } from "../../../../domain/entity/law";
import { DeviceEntity } from "../../../../domain/entity/device";
import { ChecklistItemEntity } from "../../../../domain/entity/checklistItem";

async function createChecklist(
  req: CreateChecklistUseCaseRequest,
): Promise<ChecklistEntity> {
  return null;

  // const checklist = await prisma.checklists.create({
  //   data: {
  //     userId: req.userId,
  //     systemId: req.systemId,
  //     isGeneral: req.isGeneral,
  //     isIot: req.isIot,
  //     checklistData: req.checklistData,
  //   },
  // });

  // return new ChecklistEntity(
  //   checklist.id,
  //   checklist.userId,
  //   checklist.systemId,
  //   checklist.checklistData,
  //   checklist.isGeneral,
  //   checklist.isIot,
  // );
}

async function getChecklist(id: number): Promise<ChecklistEntity> {
  const checklist = await prisma.checklists.findUnique({
    where: {
      id,
    },
    include: {
      ItemsChecklists: {
        include: {
          item: {
            include: {
              devices: true,
              laws: true,
            },
          },
        },
      },
    },
  });

  return checklist
    ? new ChecklistEntity(
        checklist.id,
        checklist.userId,
        checklist.systemId,
        checklist.ItemsChecklists.map(
          (itemChecklist) =>
            new ChecklistItemEntity(
              null,
              new ItemEntity(
                itemChecklist.item.id,
                itemChecklist.item.code,
                itemChecklist.item.itemDesc,
                itemChecklist.item.recommendations,
                itemChecklist.item.isMandatory,
                itemChecklist.item.laws.map(
                  (law) => new LawEntity(law.id, law.name),
                ),
                itemChecklist.item.devices.map(
                  (dev) => new DeviceEntity(dev.id, dev.name),
                ),
              ),
              itemChecklist.answer,
              itemChecklist.severityDegree,
              itemChecklist.userComment,
            ),
        ),
        checklist.createdAt,
        checklist.updatedAt,
      )
    : null;
}

async function deleteChecklist(id: number): Promise<void> {
  await prisma.checklists.delete({
    where: {
      id,
    },
  });
}

async function updateChecklist(
  req: UpdateChecklistUseCaseRequest,
): Promise<void> {
  return null;

  // await prisma.checklists.update({
  //   where: {
  //     id: req.id,
  //   },
  //   data: {
  //     systemId: req.systemId,
  //     checklistData: req.checklistData,
  //     isGeneral: req.isGeneral,
  //     isIot: req.isIot,
  //   },
  // });
}

async function listChecklistsByUserId(
  userId: number,
): Promise<ChecklistEntity[]> {
  return null;

  // const checklists = await prisma.checklists.findMany({
  //   where: {
  //     userId,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  // });

  // return checklists.map(
  //   (checklist: Checklists) =>
  //     new ChecklistEntity(
  //       checklist.id,
  //       checklist.userId,
  //       checklist.systemId,
  //       null,
  //       checklist.isGeneral,
  //       checklist.isIot,
  //       checklist.createdAt,
  //       checklist.updatedAt,
  //     ),
  // );
}

async function listChecklistsBySystemId(
  systemId: number,
): Promise<ChecklistEntity[]> {
  return null;

  // const checklists = await prisma.checklists.findMany({
  //   where: {
  //     systemId,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  // });

  // return checklists.map(
  //   (checklist: Checklists) =>
  //     new ChecklistEntity(
  //       checklist.id,
  //       checklist.userId,
  //       checklist.systemId,
  //       null,
  //       checklist.isGeneral,
  //       checklist.isIot,
  //       checklist.createdAt,
  //       checklist.updatedAt,
  //     ),
  // );
}

export {
  createChecklist,
  getChecklist,
  deleteChecklist,
  updateChecklist,
  listChecklistsByUserId,
  listChecklistsBySystemId,
};
