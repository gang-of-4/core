/*
  Warnings:

  - A unique constraint covering the columns `[storeId]` on the table `BusinessStore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BusinessStore_storeId_key" ON "BusinessStore"("storeId");
