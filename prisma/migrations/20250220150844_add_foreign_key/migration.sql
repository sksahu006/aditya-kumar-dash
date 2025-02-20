/*
  Warnings:

  - You are about to drop the column `category` on the `PortFolioProject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PortFolioProject" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PortFolioProject" ADD CONSTRAINT "PortFolioProject_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
