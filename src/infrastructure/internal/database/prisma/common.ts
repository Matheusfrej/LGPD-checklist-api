import { prisma } from "../../connection/prisma";

export async function runInTransaction<T>(fn: () => Promise<T>): Promise<T> {
  return prisma.$transaction(async () => {
    return fn();
  });
}
