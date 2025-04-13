import { PrismaClient } from "@prisma/client";

export abstract class PrismaRepository {
  constructor(protected prisma: PrismaClient) {}

  async runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async () => {
      return fn();
    });
  }
}
