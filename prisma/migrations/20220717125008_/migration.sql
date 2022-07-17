/*
  Warnings:

  - Added the required column `metaData` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "metaData" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "rewards" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "responses" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "meta" JSONB NOT NULL,
    "formId" INTEGER,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redemptions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "rewardId" INTEGER NOT NULL,
    "isProcessed" BOOLEAN NOT NULL,

    CONSTRAINT "redemptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redemptions" ADD CONSTRAINT "redemptions_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "rewards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
