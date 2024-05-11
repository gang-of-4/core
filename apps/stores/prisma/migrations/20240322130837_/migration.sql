/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `logo` on the `BusinessStore` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BusinessStore" DROP COLUMN "logo",
ADD COLUMN     "logo" UUID NOT NULL;

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "User";
