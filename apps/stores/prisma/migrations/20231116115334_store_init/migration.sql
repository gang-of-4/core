-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'INREVIEW', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" UUID NOT NULL,
    "extension" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessStore" (
    "id" UUID NOT NULL,
    "storeId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "vat_number" TEXT NOT NULL,
    "cr_number" TEXT NOT NULL,
    "owner_national_id" TEXT NOT NULL,

    CONSTRAINT "BusinessStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualStore" (
    "id" UUID NOT NULL,
    "storeId" UUID NOT NULL,

    CONSTRAINT "IndividualStore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Store_vendorId_idx" ON "Store"("vendorId");

-- CreateIndex
CREATE INDEX "Media_ownerId_idx" ON "Media"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualStore_storeId_key" ON "IndividualStore"("storeId");

-- AddForeignKey
ALTER TABLE "BusinessStore" ADD CONSTRAINT "BusinessStore_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualStore" ADD CONSTRAINT "IndividualStore_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
