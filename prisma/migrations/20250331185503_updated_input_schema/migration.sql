/*
  Warnings:

  - You are about to drop the `InsightsInput` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InsightsOutput` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InsightsInput" DROP CONSTRAINT "InsightsInput_projectId_fkey";

-- DropForeignKey
ALTER TABLE "InsightsInput" DROP CONSTRAINT "InsightsInput_userID_fkey";

-- DropForeignKey
ALTER TABLE "InsightsOutput" DROP CONSTRAINT "InsightsOutput_projectId_fkey";

-- DropForeignKey
ALTER TABLE "InsightsOutput" DROP CONSTRAINT "InsightsOutput_userID_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "industry" TEXT;

-- DropTable
DROP TABLE "InsightsInput";

-- DropTable
DROP TABLE "InsightsOutput";

-- CreateTable
CREATE TABLE "QuickStrategyInput" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "brandName" TEXT,
    "category" TEXT,
    "productValue" TEXT,
    "audienceInsights" TEXT,
    "desiredPersona" TEXT,
    "brandVision" TEXT,

    CONSTRAINT "QuickStrategyInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuickStrategyOutput" (
    "id" TEXT NOT NULL,
    "BrandPosition" TEXT[],
    "BrandMessaging" TEXT[],
    "BrandPromise" TEXT[],
    "ReasonsToBelieve" TEXT[],
    "BrandPersonality" TEXT[],
    "BrandBenefits" TEXT[],
    "BrandBeliefs" TEXT[],
    "BrandMission" TEXT[],
    "BrandStory" TEXT[],
    "BrandArchetype" TEXT[],
    "ToneOfVoice" TEXT[],
    "projectId" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "QuickStrategyInputId" TEXT,

    CONSTRAINT "QuickStrategyOutput_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuickStrategyOutput_QuickStrategyInputId_key" ON "QuickStrategyOutput"("QuickStrategyInputId");

-- AddForeignKey
ALTER TABLE "QuickStrategyInput" ADD CONSTRAINT "QuickStrategyInput_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickStrategyInput" ADD CONSTRAINT "QuickStrategyInput_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickStrategyOutput" ADD CONSTRAINT "QuickStrategyOutput_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickStrategyOutput" ADD CONSTRAINT "QuickStrategyOutput_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuickStrategyOutput" ADD CONSTRAINT "QuickStrategyOutput_QuickStrategyInputId_fkey" FOREIGN KEY ("QuickStrategyInputId") REFERENCES "QuickStrategyInput"("id") ON DELETE SET NULL ON UPDATE CASCADE;
