/*
  Warnings:

  - You are about to drop the column `isActive` on the `VocalTestResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "VocalTestResult" DROP COLUMN "isActive";
