/*
  Warnings:

  - You are about to drop the column `userID` on the `QuickStrategyInput` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - Added the required column `userId` to the `QuickStrategyInput` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `QuickStrategyOutput` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QuickStrategyInput" DROP CONSTRAINT "QuickStrategyInput_userID_fkey";

-- DropForeignKey
ALTER TABLE "QuickStrategyOutput" DROP CONSTRAINT "QuickStrategyOutput_userID_fkey";

-- AlterTable
ALTER TABLE "QuickStrategyInput" DROP COLUMN "userID",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuickStrategyOutput" DROP COLUMN "userID",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuickStrategyInput" ADD CONSTRAINT "QuickStrategyInput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickStrategyOutput" ADD CONSTRAINT "QuickStrategyOutput_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
