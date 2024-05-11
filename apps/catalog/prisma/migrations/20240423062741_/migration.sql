/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Item_storeId_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Item_slug_key" ON "Item"("slug");
