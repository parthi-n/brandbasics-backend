/*
  Warnings:

  - You are about to drop the `insights_input` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `insights_output` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectSlug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectSlug` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "insights_input" DROP CONSTRAINT "insights_input_projectId_fkey";

-- DropForeignKey
ALTER TABLE "insights_input" DROP CONSTRAINT "insights_input_userID_fkey";

-- DropForeignKey
ALTER TABLE "insights_output" DROP CONSTRAINT "insights_output_projectId_fkey";

-- DropForeignKey
ALTER TABLE "insights_output" DROP CONSTRAINT "insights_output_userID_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "projectSlug" TEXT NOT NULL;

-- DropTable
DROP TABLE "insights_input";

-- DropTable
DROP TABLE "insights_output";

-- CreateTable
CREATE TABLE "InsightsInput" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "userID" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "InsightsInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsightsOutput" (
    "id" TEXT NOT NULL,
    "summary" TEXT,
    "keyWords" TEXT[],
    "brandBeliefs" TEXT,
    "brandPersonality" TEXT[],
    "brandBenefits" TEXT[],
    "ReasonsToBelieve" TEXT[],
    "brandPosition" TEXT,
    "brandPromise" TEXT,
    "targetAudience" TEXT[],
    "projectId" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "InsightsOutput_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectSlug_key" ON "Project"("projectSlug");

-- AddForeignKey
ALTER TABLE "InsightsInput" ADD CONSTRAINT "InsightsInput_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsightsInput" ADD CONSTRAINT "InsightsInput_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsightsOutput" ADD CONSTRAINT "InsightsOutput_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsightsOutput" ADD CONSTRAINT "InsightsOutput_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
