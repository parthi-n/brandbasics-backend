/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectOwnerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insights_input" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "userID" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "insights_input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insights_output" (
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

    CONSTRAINT "insights_output_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_projectOwnerId_fkey" FOREIGN KEY ("projectOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insights_input" ADD CONSTRAINT "insights_input_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insights_input" ADD CONSTRAINT "insights_input_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insights_output" ADD CONSTRAINT "insights_output_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insights_output" ADD CONSTRAINT "insights_output_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
