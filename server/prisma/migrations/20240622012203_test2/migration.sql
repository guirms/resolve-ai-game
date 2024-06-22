/*
  Warnings:

  - You are about to drop the column `TotalRemainingHints2` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `TotalRemainingHints2`,
    ADD COLUMN `TotalRemainingHints` INTEGER NOT NULL DEFAULT 9;
