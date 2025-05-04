import { LawEntity } from "../../../../domain/entity/law";
import { LawRepositoryInterface } from "../../../../domain/usecase/repository/law";
import { CreateLawUseCaseRequest } from "../../../../domain/usecase/ucio/law";
import { PrismaRepository } from "./repository";
import { Prisma } from "@prisma/client";

export class LawPrismaRepository
  extends PrismaRepository
  implements LawRepositoryInterface
{
  protected withTransaction(tx: Prisma.TransactionClient): this {
    return new LawPrismaRepository(tx) as this;
  }

  create(req: CreateLawUseCaseRequest): Promise<LawEntity> {
    throw new Error("Method not implemented." + req);
  }

  async existByIds(ids: number[]): Promise<number[]> {
    const items = await this.prisma.laws.findMany({
      where: {
        id: { in: ids },
      },
    });

    return ids.filter((id) => !items.find((item) => item.id === id));
  }

  async list(): Promise<LawEntity[]> {
    const laws = await this.prisma.laws.findMany({});

    return laws.map((law) => new LawEntity(law.id, law.name));
  }
}
