-- AddForeignKey
ALTER TABLE "ChecklistItemsChecklists" ADD CONSTRAINT "ChecklistItemsChecklists_checklist_id_fkey" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItemsChecklists" ADD CONSTRAINT "ChecklistItemsChecklists_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ChecklistItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
