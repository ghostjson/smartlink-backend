/*
  Warnings:

  - Added the required column `isPublished` to the `redemptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "redemptions" ADD COLUMN     "isPublished" BOOLEAN NOT NULL;
