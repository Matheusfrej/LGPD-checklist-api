import { ChecklistEntity } from "../../../../domain/entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../../../../domain/usecase/ucio/checklist";
import { prisma } from "../../connection/prisma";

async function createChecklist(
  req: CreateChecklistUseCaseRequest,
): Promise<ChecklistEntity> {
  const checklist = await prisma.checklists.create({
    data: {
      userId: req.userId,
      systemId: req.systemId,
      isGeneral: req.isGeneral,
      isIot: req.isIot,
      checklistData: req.checklistData,
    },
  });

  return new ChecklistEntity(
    checklist.id,
    checklist.userId,
    checklist.systemId,
    checklist.checklistData,
    checklist.isGeneral,
    checklist.isIot,
  );
}

async function getChecklist(id: number): Promise<ChecklistEntity> {
  const checklist = await prisma.checklists.findUnique({
    where: {
      id,
    },
  });

  return checklist
    ? new ChecklistEntity(
        checklist.id,
        checklist.userId,
        checklist.systemId,
        checklist.checklistData,
        checklist.isGeneral,
        checklist.isIot,
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
      checklistData: req.checklistData,
      isGeneral: req.isGeneral,
      isIot: req.isIot,
    },
  });
}

export { createChecklist, getChecklist, deleteChecklist, updateChecklist };