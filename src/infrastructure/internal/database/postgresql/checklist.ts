import { ChecklistEntity } from "../../../../domain/entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../../../../domain/usecase/ucio/checklist";
import { prisma } from "../../connection/prisma";
import { ItemEntity } from "../../../../domain/entity/item";
import { LawEntity } from "../../../../domain/entity/law";
import { DeviceEntity } from "../../../../domain/entity/device";
import {
  AnswerType,
  ChecklistItemEntity,
  SeverityDegreeType,
} from "../../../../domain/entity/checklistItem";

async function createChecklist(
  req: CreateChecklistUseCaseRequest,
): Promise<ChecklistEntity> {
  const checklist = await prisma.checklists.create({
    data: {
      userId: req.userId,
      systemId: req.systemId,
      ItemsChecklists: {
        createMany: {
          data: req.items.map((item) => {
            return {
              itemId: item.id,
              answer: item.answer,
              severityDegree: item.severityDegree,
              userComment: item.userComment,
            };
          }),
        },
      },
    },
    include: {
      ItemsChecklists: {
        include: {
          item: true,
        },
      },
    },
  });

  return new ChecklistEntity(
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
          ),
          itemChecklist.answer as AnswerType,
          itemChecklist.severityDegree as SeverityDegreeType,
          itemChecklist.userComment,
        ),
    ),
  );
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
              itemChecklist.answer as AnswerType,
              itemChecklist.severityDegree as SeverityDegreeType,
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
  await prisma.checklists.update({
    where: {
      id: req.id,
    },
    data: {
      systemId: req.systemId,
      ItemsChecklists: {
        createMany: {
          data: req.items.map((item) => {
            return {
              itemId: item.id,
              answer: item.answer,
              severityDegree: item.severityDegree,
              userComment: item.userComment,
            };
          }),
        },
      },
    },
  });
}

async function listChecklistsByUserId(
  userId: number,
): Promise<ChecklistEntity[]> {
  const checklists = await prisma.checklists.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return checklists.map(
    (checklist) =>
      new ChecklistEntity(
        checklist.id,
        checklist.userId,
        checklist.systemId,
        null,
        checklist.createdAt,
        checklist.updatedAt,
      ),
  );
}

async function listChecklistsBySystemId(
  systemId: number,
): Promise<ChecklistEntity[]> {
  const checklists = await prisma.checklists.findMany({
    where: {
      systemId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return checklists.map(
    (checklist) =>
      new ChecklistEntity(
        checklist.id,
        checklist.userId,
        checklist.systemId,
        null,
        checklist.createdAt,
        checklist.updatedAt,
      ),
  );
}

async function getItemsFromChecklist(
  id: number,
): Promise<ChecklistItemEntity[]> {
  const items = await prisma.checklistItems.findMany({
    where: {
      checklistId: id,
    },
    include: {
      item: true,
    },
  });

  return items.map((item) => {
    return new ChecklistItemEntity(
      null,
      new ItemEntity(
        item.item.id,
        item.item.code,
        item.item.itemDesc,
        item.item.recommendations,
        item.item.isMandatory,
        null,
        null,
      ),
      item.answer as AnswerType,
      item.severityDegree as SeverityDegreeType,
      item.userComment,
    );
  });
}

async function insertItemsInChecklist(
  id: number,
  items: ChecklistItemEntity[],
) {
  await prisma.checklists.update({
    where: { id },
    data: {
      ItemsChecklists: {
        createMany: {
          data: items.map((item) => {
            return {
              itemId: item.item.id,
              answer: item.answer,
              severityDegree: item.severityDegree,
              userComment: item.userComment,
            };
          }),
        },
      },
    },
  });
}

async function removeItemsFromChecklist(id: number, itemsIds: number[]) {
  await prisma.checklistItems.deleteMany({
    where: {
      AND: {
        checklistId: id,
        itemId: {
          in: itemsIds,
        },
      },
    },
  });
}

async function updateItemFromChecklist(id: number, item: ChecklistItemEntity) {
  await prisma.checklistItems.update({
    where: { checklistId_itemId: { checklistId: id, itemId: item.item.id } },
    data: {
      answer: item.answer,
      severityDegree: item.severityDegree,
      userComment: item.userComment,
    },
  });
}

export {
  createChecklist,
  getChecklist,
  deleteChecklist,
  updateChecklist,
  listChecklistsByUserId,
  listChecklistsBySystemId,
  getItemsFromChecklist,
  insertItemsInChecklist,
  removeItemsFromChecklist,
  updateItemFromChecklist,
};
