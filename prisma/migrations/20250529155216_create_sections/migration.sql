-- CreateTable
CREATE TABLE "sections" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_item_sections" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_item_sections_AB_unique" ON "_item_sections"("A", "B");

-- CreateIndex
CREATE INDEX "_item_sections_B_index" ON "_item_sections"("B");

-- AddForeignKey
ALTER TABLE "_item_sections" ADD CONSTRAINT "_item_sections_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_item_sections" ADD CONSTRAINT "_item_sections_B_fkey" FOREIGN KEY ("B") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
