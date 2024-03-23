/*
  Warnings:

  - The values [RADIO] on the enum `OptionType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `ItemImages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `ItemCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariantOptions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[storeId,slug]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OptionType_new" AS ENUM ('TEXT', 'COLOR');
ALTER TABLE "OptionGroup" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "OptionGroup" ALTER COLUMN "type" TYPE "OptionType_new" USING ("type"::text::"OptionType_new");
ALTER TYPE "OptionType" RENAME TO "OptionType_old";
ALTER TYPE "OptionType_new" RENAME TO "OptionType";
DROP TYPE "OptionType_old";
ALTER TABLE "OptionGroup" ALTER COLUMN "type" SET DEFAULT 'TEXT';
COMMIT;

-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'DRAFT';
COMMIT;

-- DropForeignKey
ALTER TABLE "Cateogry" DROP CONSTRAINT "Cateogry_parentId_fkey";

-- DropForeignKey
ALTER TABLE "ItemCategories" DROP CONSTRAINT "ItemCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ItemCategories" DROP CONSTRAINT "ItemCategories_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemOptions" DROP CONSTRAINT "ItemOptions_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemOptions" DROP CONSTRAINT "ItemOptions_optionId_fkey";

-- DropForeignKey
ALTER TABLE "VariantOptions" DROP CONSTRAINT "VariantOptions_optionId_fkey";

-- DropForeignKey
ALTER TABLE "VariantOptions" DROP CONSTRAINT "VariantOptions_variantId_fkey";

-- DropIndex
DROP INDEX "Item_slug_key";

-- AlterTable
ALTER TABLE "Cateogry" ALTER COLUMN "banner" DROP NOT NULL,
ALTER COLUMN "banner" SET DATA TYPE TEXT,
ALTER COLUMN "parentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "sku" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'DRAFT',
ALTER COLUMN "order" DROP NOT NULL,
ALTER COLUMN "isActive" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ItemImages" DROP CONSTRAINT "ItemImages_pkey",
ADD CONSTRAINT "ItemImages_pkey" PRIMARY KEY ("itemId", "mediaId");

-- AlterTable
ALTER TABLE "OptionGroup" ALTER COLUMN "type" SET DEFAULT 'TEXT';

-- DropTable
DROP TABLE "ItemCategories";

-- DropTable
DROP TABLE "ItemOptions";

-- DropTable
DROP TABLE "VariantOptions";

-- CreateTable
CREATE TABLE "_ItemToOption" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CateogryToItem" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_OptionToVariant" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToOption_AB_unique" ON "_ItemToOption"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToOption_B_index" ON "_ItemToOption"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CateogryToItem_AB_unique" ON "_CateogryToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CateogryToItem_B_index" ON "_CateogryToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OptionToVariant_AB_unique" ON "_OptionToVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionToVariant_B_index" ON "_OptionToVariant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Item_storeId_slug_key" ON "Item"("storeId", "slug");

-- AddForeignKey
ALTER TABLE "Cateogry" ADD CONSTRAINT "Cateogry_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Cateogry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOption" ADD CONSTRAINT "_ItemToOption_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOption" ADD CONSTRAINT "_ItemToOption_B_fkey" FOREIGN KEY ("B") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CateogryToItem" ADD CONSTRAINT "_CateogryToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Cateogry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CateogryToItem" ADD CONSTRAINT "_CateogryToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionToVariant" ADD CONSTRAINT "_OptionToVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OptionToVariant" ADD CONSTRAINT "_OptionToVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "Variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
