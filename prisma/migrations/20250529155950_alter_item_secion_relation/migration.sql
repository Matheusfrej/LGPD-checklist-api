/*
  Warnings:

  - You are about to drop the `_item_sections` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sectionId` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_item_sections" DROP CONSTRAINT "_item_sections_A_fkey";

-- DropForeignKey
ALTER TABLE "_item_sections" DROP CONSTRAINT "_item_sections_B_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "sectionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_item_sections";

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
