import { Prisma, PrismaClient } from "@prisma/client";

export abstract class PrismaRepository {
  constructor(protected prisma: PrismaClient | Prisma.TransactionClient) {}

  protected abstract withTransaction(tx: Prisma.TransactionClient): this;

  async runInTransaction<T>(fn: (repo: this) => Promise<T>): Promise<T> {
    return (this.prisma as PrismaClient).$transaction(
      async (tx: Prisma.TransactionClient) => {
        const txRepo = this.withTransaction(tx);
        return fn(txRepo);
      },
    );
  }
}
