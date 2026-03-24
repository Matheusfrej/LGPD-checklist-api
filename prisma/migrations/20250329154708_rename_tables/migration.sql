/*
  Warnings:

  - You are about to drop the `ChecklistItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChecklistItemsChecklists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Devices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Laws` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChecklistItemsToDevices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChecklistItemsToLaws` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChecklistItemsChecklists" DROP CONSTRAINT "ChecklistItemsChecklists_checklist_id_fkey";

-- DropForeignKey
ALTER TABLE "ChecklistItemsChecklists" DROP CONSTRAINT "ChecklistItemsChecklists_item_id_fkey";

-- DropForeignKey
ALTER TABLE "_ChecklistItemsToDevices" DROP CONSTRAINT "_ChecklistItemsToDevices_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChecklistItemsToDevices" DROP CONSTRAINT "_ChecklistItemsToDevices_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChecklistItemsToLaws" DROP CONSTRAINT "_ChecklistItemsToLaws_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChecklistItemsToLaws" DROP CONSTRAINT "_ChecklistItemsToLaws_B_fkey";

-- DropTable
DROP TABLE "ChecklistItems";

-- DropTable
DROP TABLE "ChecklistItemsChecklists";

-- DropTable
DROP TABLE "Devices";

-- DropTable
DROP TABLE "Laws";

-- DropTable
DROP TABLE "_ChecklistItemsToDevices";

-- DropTable
DROP TABLE "_ChecklistItemsToLaws";

-- CreateTable
CREATE TABLE "laws" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "laws_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "item_desc" VARCHAR(255) NOT NULL,
    "recommendations" VARCHAR(255) NOT NULL,
    "is_mandatory" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checklist_items" (
    "checklist_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "severity_degree" VARCHAR(255),
    "user_comment" VARCHAR(255),

    CONSTRAINT "checklist_items_pkey" PRIMARY KEY ("checklist_id","item_id")
);

-- CreateTable
CREATE TABLE "_item_devices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_item_laws" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "items_code_key" ON "items"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_item_devices_AB_unique" ON "_item_devices"("A", "B");

-- CreateIndex
CREATE INDEX "_item_devices_B_index" ON "_item_devices"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_item_laws_AB_unique" ON "_item_laws"("A", "B");

-- CreateIndex
CREATE INDEX "_item_laws_B_index" ON "_item_laws"("B");

-- AddForeignKey
ALTER TABLE "checklist_items" ADD CONSTRAINT "checklist_items_checklist_id_fkey" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checklist_items" ADD CONSTRAINT "checklist_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_item_devices" ADD CONSTRAINT "_item_devices_A_fkey" FOREIGN KEY ("A") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_item_devices" ADD CONSTRAINT "_item_devices_B_fkey" FOREIGN KEY ("B") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_item_laws" ADD CONSTRAINT "_item_laws_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_item_laws" ADD CONSTRAINT "_item_laws_B_fkey" FOREIGN KEY ("B") REFERENCES "laws"("id") ON DELETE CASCADE ON UPDATE CASCADE;
