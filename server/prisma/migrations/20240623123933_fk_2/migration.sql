/*
  Warnings:

  - You are about to drop the column `daily_challengeDailyChallengeId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_daily_challengeDailyChallengeId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `daily_challengeDailyChallengeId`;

-- CreateTable
CREATE TABLE `_UserDailyChallenges` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserDailyChallenges_AB_unique`(`A`, `B`),
    INDEX `_UserDailyChallenges_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserDailyChallenges` ADD CONSTRAINT `_UserDailyChallenges_A_fkey` FOREIGN KEY (`A`) REFERENCES `daily_challenge`(`DailyChallengeId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserDailyChallenges` ADD CONSTRAINT `_UserDailyChallenges_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;
