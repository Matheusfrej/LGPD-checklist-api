import { SectionEntity } from "../../../../domain/entity/section";
import { SectionRepositoryInterface } from "../../../../domain/usecase/repository/section";
import { CreateSectionUseCaseRequest } from "../../../../domain/usecase/ucio/section";
import { PrismaRepository } from "./repository";
import { Prisma } from "@prisma/client";

export class SectionPrismaRepository
  extends PrismaRepository
  implements SectionRepositoryInterface
{
  protected withTransaction(tx: Prisma.TransactionClient): this {
    return new SectionPrismaRepository(tx) as this;
  }

  async create(req: CreateSectionUseCaseRequest): Promise<SectionEntity> {
    const section = await this.prisma.sections.create({
      data: { name: req.name },
    });
    return new SectionEntity(section.id, section.name);
  }
}
