/*
  Warnings:

  - You are about to drop the column `answers` on the `responses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "responses" DROP COLUMN "answers";

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "questionId" INTEGER NOT NULL,
    "responseId" INTEGER,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "responses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
