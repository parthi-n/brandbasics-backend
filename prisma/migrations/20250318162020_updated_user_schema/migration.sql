/*
  Warnings:

  - Added the required column `userType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "userTypes" AS ENUM ('superadmin', 'admin', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "userTypes" NOT NULL;
