/*
  Warnings:

  - You are about to drop the column `checklistData` on the `checklists` table. All the data in the column will be lost.
  - You are about to drop the column `familiesId` on the `checklists` table. All the data in the column will be lost.
  - You are about to drop the column `systemId` on the `checklists` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `checklists` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `systems` table. All the data in the column will be lost.
  - You are about to drop the `families` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `checklist_data` to the `checklists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `system_id` to the `checklists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `checklists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `systems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "checklists" DROP CONSTRAINT "checklists_familiesId_fkey";

-- DropForeignKey
ALTER TABLE "checklists" DROP CONSTRAINT "checklists_systemId_fkey";

-- DropForeignKey
ALTER TABLE "checklists" DROP CONSTRAINT "checklists_userId_fkey";

-- DropForeignKey
ALTER TABLE "systems" DROP CONSTRAINT "systems_userId_fkey";

-- AlterTable
ALTER TABLE "checklists" DROP COLUMN "checklistData",
DROP COLUMN "familiesId",
DROP COLUMN "systemId",
DROP COLUMN "userId",
ADD COLUMN     "checklist_data" JSONB NOT NULL,
ADD COLUMN     "is_general" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_iot" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "system_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "systems" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "families";

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklists" ADD CONSTRAINT "checklists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklists" ADD CONSTRAINT "checklists_system_id_fkey" FOREIGN KEY ("system_id") REFERENCES "systems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
