/*
  Warnings:

  - You are about to drop the column `projectSlug` on the `Project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Project_projectSlug_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "projectSlug";
