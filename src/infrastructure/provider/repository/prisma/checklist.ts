import { ChecklistEntity } from "../../../../domain/entity/checklist";
import {
  CreateChecklistUseCaseRequest,
  DeleteChecklistUseCaseRequest,
  ListChecklistsBySystemIdUseCaseRequest,
  ListChecklistsByUserIdUseCaseRequest,
  UpdateChecklistUseCaseRequest,
} from "../../../../domain/usecase/ucio/checklist";
import { ChecklistRepositoryInterface } from "../../../../domain/usecase/repository/checklist";
import {
  AnswerType,
  ChecklistItemEntity,
  SeverityDegreeType,
} from "../../../../domain/entity/checklistItem";
import { ItemEntity } from "../../../../domain/entity/item";
import { LawEntity } from "../../../../domain/entity/law";
import { DeviceEntity } from "../../../../domain/entity/device";
import { PrismaRepository } from "./repository";
import { Prisma } from "@prisma/client";
import { SectionEntity } from "../../../../domain/entity/section";

class ChecklistPrismaRepository
  extends PrismaRepository
  implements ChecklistRepositoryInterface
{
  items?: ChecklistEntity[];

  protected withTransaction(tx: Prisma.TransactionClient): this {
    return new ChecklistPrismaRepository(tx) as this;
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
        laws: {
          connect: req.laws.map((id) => ({ id })),
        },
        devices: {
          connect: req.devices.map((id) => ({ id })),
        },
      },
      include: {
        ItemsChecklists: {
          include: {
            item: {
              include: {
                section: true,
              },
            },
          },
        },
        laws: true,
        devices: true,
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
              itemChecklist.item.sectionId,
              new SectionEntity(
                itemChecklist.item.section.id,
                itemChecklist.item.section.name,
              ),
            ),
            itemChecklist.answer as AnswerType,
            itemChecklist.severityDegree as SeverityDegreeType,
            itemChecklist.userComment,
          ),
      ),
      checklist.laws.map((law) => new LawEntity(law.id, law.name)),
      checklist.devices.map(
        (device) => new DeviceEntity(device.id, device.name),
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
                section: true,
              },
            },
          },
        },
        laws: true,
        devices: true,
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
                  itemChecklist.item.sectionId,
                  new SectionEntity(
                    itemChecklist.item.section.id,
                    itemChecklist.item.section.name,
                  ),
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
          checklist.laws.map((law) => new LawEntity(law.id, law.name)),
          checklist.devices.map(
            (device) => new DeviceEntity(device.id, device.name),
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

  async updateChecklist(req: UpdateChecklistUseCaseRequest): Promise<void> {
    await this.prisma.checklists.update({
      where: {
        id: req.id,
      },
      data: {
        systemId: req.systemId,
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
          null,
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
          null,
          null,
          checklist.createdAt,
          checklist.updatedAt,
        ),
    );
  }

  async getItems(id: number): Promise<ChecklistItemEntity[]> {
    const items = await this.prisma.checklistItems.findMany({
      where: {
        checklistId: id,
      },
      include: {
        item: {
          include: {
            section: true,
          },
        },
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
          item.item.sectionId,
          new SectionEntity(item.item.section.id, item.item.section.name),
          null,
          null,
        ),
        item.answer as AnswerType,
        item.severityDegree as SeverityDegreeType,
        item.userComment,
      );
    });
  }

  async insertItems(id: number, items: ChecklistItemEntity[]): Promise<void> {
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

  async removeItems(id: number, itemsIds: number[]): Promise<void> {
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

  async updateItem(id: number, item: ChecklistItemEntity): Promise<void> {
    await this.prisma.checklistItems.update({
      where: { checklistId_itemId: { checklistId: id, itemId: item.item.id } },
      data: {
        answer: item.answer,
        severityDegree: item.severityDegree,
        userComment: item.userComment,
      },
    });
  }

  async getLaws(id: number): Promise<LawEntity[]> {
    const laws = await this.prisma.laws.findMany({
      where: {
        checklists: {
          some: {
            id,
          },
        },
      },
    });

    return laws.map((law) => new LawEntity(law.id, law.name));
  }

  async insertLaws(id: number, lawsIds: number[]): Promise<void> {
    await this.prisma.checklists.update({
      where: { id },
      data: {
        laws: {
          connect: lawsIds.map((lawId) => ({ id: lawId })),
        },
      },
    });
  }

  async removeLaws(id: number, lawsIds: number[]): Promise<void> {
    await this.prisma.checklists.update({
      where: { id },
      data: {
        laws: {
          disconnect: lawsIds.map((lawId) => ({ id: lawId })),
        },
      },
    });
  }

  async getDevices(id: number): Promise<DeviceEntity[]> {
    const devices = await this.prisma.devices.findMany({
      where: {
        checklists: {
          some: {
            id,
          },
        },
      },
    });

    return devices.map((device) => new DeviceEntity(device.id, device.name));
  }

  async insertDevices(id: number, devicesIds: number[]): Promise<void> {
    await this.prisma.checklists.update({
      where: { id },
      data: {
        devices: {
          connect: devicesIds.map((deviceId) => ({ id: deviceId })),
        },
      },
    });
  }

  async removeDevices(id: number, devicesIds: number[]): Promise<void> {
    await this.prisma.checklists.update({
      where: { id },
      data: {
        devices: {
          disconnect: devicesIds.map((deviceId) => ({ id: deviceId })),
        },
      },
    });
  }
}

export { ChecklistPrismaRepository };
