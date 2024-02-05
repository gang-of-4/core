/*
  Warnings:

  - A unique constraint covering the columns `[method,url]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Activity_method_url_idx";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "method" SET DATA TYPE VARCHAR(8);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_method_url_key" ON "Activity"("method", "url");
