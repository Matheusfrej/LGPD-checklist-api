/*
  Warnings:

  - You are about to drop the column `sectionId` on the `items` table. All the data in the column will be lost.
  - Added the required column `section_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_sectionId_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "sectionId",
ADD COLUMN     "section_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
