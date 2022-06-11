/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "phone",
ADD COLUMN     "facebookId" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "profile" TEXT;
