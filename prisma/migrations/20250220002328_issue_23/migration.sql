/*
  Warnings:

  - You are about to drop the column `checklist_data` on the `checklists` table. All the data in the column will be lost.
  - You are about to drop the column `is_general` on the `checklists` table. All the data in the column will be lost.
  - You are about to drop the column `is_iot` on the `checklists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "checklists" DROP COLUMN "checklist_data",
DROP COLUMN "is_general",
DROP COLUMN "is_iot";

-- CreateTable
CREATE TABLE "Laws" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Laws_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devices" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItems" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "item_desc" VARCHAR(255) NOT NULL,
    "recommendations" VARCHAR(255) NOT NULL,
    "is_mandatory" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChecklistItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItemsChecklists" (
    "checklist_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "severity_degree" VARCHAR(255),
    "user_comment" VARCHAR(255),

    CONSTRAINT "ChecklistItemsChecklists_pkey" PRIMARY KEY ("checklist_id","item_id")
);

-- CreateTable
CREATE TABLE "_ChecklistItemsToLaws" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ChecklistItemsToDevices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ChecklistItems_code_key" ON "ChecklistItems"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_ChecklistItemsToLaws_AB_unique" ON "_ChecklistItemsToLaws"("A", "B");

-- CreateIndex
CREATE INDEX "_ChecklistItemsToLaws_B_index" ON "_ChecklistItemsToLaws"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChecklistItemsToDevices_AB_unique" ON "_ChecklistItemsToDevices"("A", "B");

-- CreateIndex
CREATE INDEX "_ChecklistItemsToDevices_B_index" ON "_ChecklistItemsToDevices"("B");

-- AddForeignKey
ALTER TABLE "_ChecklistItemsToLaws" ADD CONSTRAINT "_ChecklistItemsToLaws_A_fkey" FOREIGN KEY ("A") REFERENCES "ChecklistItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChecklistItemsToLaws" ADD CONSTRAINT "_ChecklistItemsToLaws_B_fkey" FOREIGN KEY ("B") REFERENCES "Laws"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChecklistItemsToDevices" ADD CONSTRAINT "_ChecklistItemsToDevices_A_fkey" FOREIGN KEY ("A") REFERENCES "ChecklistItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChecklistItemsToDevices" ADD CONSTRAINT "_ChecklistItemsToDevices_B_fkey" FOREIGN KEY ("B") REFERENCES "Devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
