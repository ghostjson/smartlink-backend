/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `redemptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "redemptions_code_key" ON "redemptions"("code");
