/*
  Warnings:

  - You are about to drop the column `currrentPrice` on the `Stock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stock" DROP COLUMN "currrentPrice",
ADD COLUMN     "currentPrice" DOUBLE PRECISION;
