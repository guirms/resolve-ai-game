/*
  Warnings:

  - You are about to drop the column `TotalRemainingHints` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `TotalRemainingHints`,
    ADD COLUMN `TotalRemainingHints2` INTEGER NOT NULL DEFAULT 9;
