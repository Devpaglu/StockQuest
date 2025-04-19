/*
  Warnings:

  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_stockSymbol_fkey";

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "currrentPrice" DOUBLE PRECISION;

-- DropTable
DROP TABLE "Price";
