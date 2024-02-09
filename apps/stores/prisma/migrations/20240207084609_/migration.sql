/*
  Warnings:

  - You are about to drop the column `cr_number` on the `BusinessStore` table. All the data in the column will be lost.
  - You are about to drop the column `owner_national_id` on the `BusinessStore` table. All the data in the column will be lost.
  - You are about to drop the column `vat_number` on the `BusinessStore` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Store` table. All the data in the column will be lost.
  - Added the required column `crNumber` to the `BusinessStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerNationalId` to the `BusinessStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vatNumber` to the `BusinessStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessStore" DROP COLUMN "cr_number",
DROP COLUMN "owner_national_id",
DROP COLUMN "vat_number",
ADD COLUMN     "crNumber" TEXT NOT NULL,
ADD COLUMN     "ownerNationalId" TEXT NOT NULL,
ADD COLUMN     "vatNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
