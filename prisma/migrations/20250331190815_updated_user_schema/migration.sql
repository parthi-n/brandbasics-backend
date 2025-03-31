/*
  Warnings:

  - You are about to drop the column `BrandArchetype` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `BrandBeliefs` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `BrandBenefits` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `BrandMessaging` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `BrandMission` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `BrandPersonality` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `BrandPosition` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `BrandPromise` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `BrandStory` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `QuickStrategyInputId` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `ReasonsToBelieve` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - You are about to drop the column `ToneOfVoice` on the `QuickStrategyOutput` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[quickStrategyInputId]` on the table `QuickStrategyOutput` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "QuickStrategyOutput" DROP CONSTRAINT "QuickStrategyOutput_QuickStrategyInputId_fkey";

-- DropIndex
DROP INDEX "QuickStrategyOutput_QuickStrategyInputId_key";

-- AlterTable
ALTER TABLE "QuickStrategyOutput" DROP COLUMN "BrandArchetype",
DROP COLUMN "BrandBeliefs",
DROP COLUMN "BrandBenefits",
DROP COLUMN "BrandMessaging",
DROP COLUMN "BrandMission",
DROP COLUMN "BrandPersonality",
DROP COLUMN "BrandPosition",
DROP COLUMN "BrandPromise",
DROP COLUMN "BrandStory",
DROP COLUMN "QuickStrategyInputId",
DROP COLUMN "ReasonsToBelieve",
DROP COLUMN "ToneOfVoice",
ADD COLUMN     "brandArchetype" TEXT[],
ADD COLUMN     "brandBeliefs" TEXT[],
ADD COLUMN     "brandBenefits" TEXT[],
ADD COLUMN     "brandMessaging" TEXT[],
ADD COLUMN     "brandMission" TEXT[],
ADD COLUMN     "brandPersonality" TEXT[],
ADD COLUMN     "brandPosition" TEXT[],
ADD COLUMN     "brandPromise" TEXT[],
ADD COLUMN     "brandStory" TEXT[],
ADD COLUMN     "quickStrategyInputId" TEXT,
ADD COLUMN     "reasonsToBelieve" TEXT[],
ADD COLUMN     "toneOfVoice" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "QuickStrategyOutput_quickStrategyInputId_key" ON "QuickStrategyOutput"("quickStrategyInputId");

-- AddForeignKey
ALTER TABLE "QuickStrategyOutput" ADD CONSTRAINT "QuickStrategyOutput_quickStrategyInputId_fkey" FOREIGN KEY ("quickStrategyInputId") REFERENCES "QuickStrategyInput"("id") ON DELETE SET NULL ON UPDATE CASCADE;
