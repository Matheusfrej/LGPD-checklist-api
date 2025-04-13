import { ChecklistEntity } from "../../../../domain/entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
} from "../../../../domain/usecase/ucio/checklist";
import { ChecklistRepositoryInterface } from "../../../../domain/usecase/repository/checklist";
import {
  AnswerType,
  ChecklistItemEntity,
  SeverityDegreeType,
} from "../../../../domain/entity/checklistItem";
import { runInTransaction } from "../../../internal/database/prisma/common";
import { PrismaClient } from "@prisma/client";
import { ItemEntity } from "../../../../domain/entity/item";
import { LawEntity } from "../../../../domain/entity/law";
import { DeviceEntity } from "../../../../domain/entity/device";

class ChecklistPrismaRepository implements ChecklistRepositoryInterface {
  constructor(private prisma: PrismaClient) {}

  async runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return await runInTransaction(fn);
  }

  async createChecklist(
    req: CreateChecklistUseCaseRequest,
  ): Promise<ChecklistEntity> {
    const checklist = await this.prisma.checklists.create({
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

  async getChecklist(id: number): Promise<ChecklistEntity> {
    const checklist = await this.prisma.checklists.findUnique({
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

  async deleteChecklist(req: DeleteChecklistUseCaseRequest): Promise<void> {
    await this.prisma.checklists.delete({
      where: {
        id: req.id,
      },
    });
  }

  async listChecklistsByUserId(
    req: ListChecklistsByUserIdUseCaseRequest,
  ): Promise<ChecklistEntity[]> {
    const checklists = await this.prisma.checklists.findMany({
      where: {
        userId: req.userId,
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

  async listChecklistsBySystemId(
    req: ListChecklistsBySystemIdUseCaseRequest,
  ): Promise<ChecklistEntity[]> {
    const checklists = await this.prisma.checklists.findMany({
      where: {
        systemId: req.systemId,
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

  async getItemsFromChecklist(id: number): Promise<ChecklistItemEntity[]> {
    const items = await this.prisma.checklistItems.findMany({
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

  async insertItemsFromChecklist(
    id: number,
    items: ChecklistItemEntity[],
  ): Promise<void> {
    await this.prisma.checklists.update({
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

  async removeItemsFromChecklist(
    id: number,
    itemsIds: number[],
  ): Promise<void> {
    await this.prisma.checklistItems.deleteMany({
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

  async updateItemFromChecklist(
    id: number,
    item: ChecklistItemEntity,
  ): Promise<void> {
    await this.prisma.checklistItems.update({
      where: { checklistId_itemId: { checklistId: id, itemId: item.item.id } },
      data: {
        answer: item.answer,
        severityDegree: item.severityDegree,
        userComment: item.userComment,
      },
    });
  }
}

export { ChecklistPrismaRepository };
