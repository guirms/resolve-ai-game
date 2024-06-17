/*
  Warnings:

  - Made the column `TotalPoints` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `TotalPoints` INTEGER NOT NULL;
