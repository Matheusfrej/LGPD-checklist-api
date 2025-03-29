import { prisma } from "../../connection/prisma";

async function itemsExistByIds(ids: number[]): Promise<number[]> {
  const items = await prisma.items.findMany({
    where: {
      id: { in: ids },
    },
  });

  return ids.filter((id) => !items.find((item) => item.id === id));
}

export { itemsExistByIds };
