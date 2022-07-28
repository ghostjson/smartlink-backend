-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "formId" INTEGER;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_formId_fkey" FOREIGN KEY ("formId") REFERENCES "forms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
