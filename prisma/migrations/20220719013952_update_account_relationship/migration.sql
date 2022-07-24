/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `Pharmacy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Pharmacy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pharmacy" ADD COLUMN     "accountId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacy_accountId_key" ON "Pharmacy"("accountId");

-- AddForeignKey
ALTER TABLE "Pharmacy" ADD CONSTRAINT "Pharmacy_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
