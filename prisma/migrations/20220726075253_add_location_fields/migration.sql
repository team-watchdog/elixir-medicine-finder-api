/*
  Warnings:

  - Added the required column `location` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "fullfilledCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "itemCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "location" JSONB NOT NULL;
