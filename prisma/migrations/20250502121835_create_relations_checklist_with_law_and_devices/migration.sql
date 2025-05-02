-- CreateTable
CREATE TABLE "_checklist_laws" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_checklist_devices" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_checklist_laws_AB_unique" ON "_checklist_laws"("A", "B");

-- CreateIndex
CREATE INDEX "_checklist_laws_B_index" ON "_checklist_laws"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_checklist_devices_AB_unique" ON "_checklist_devices"("A", "B");

-- CreateIndex
CREATE INDEX "_checklist_devices_B_index" ON "_checklist_devices"("B");

-- AddForeignKey
ALTER TABLE "_checklist_laws" ADD CONSTRAINT "_checklist_laws_A_fkey" FOREIGN KEY ("A") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_checklist_laws" ADD CONSTRAINT "_checklist_laws_B_fkey" FOREIGN KEY ("B") REFERENCES "laws"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_checklist_devices" ADD CONSTRAINT "_checklist_devices_A_fkey" FOREIGN KEY ("A") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_checklist_devices" ADD CONSTRAINT "_checklist_devices_B_fkey" FOREIGN KEY ("B") REFERENCES "devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
