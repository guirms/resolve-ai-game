/*
  Warnings:

  - You are about to drop the column `LastDailyChallengeId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `fk_LastDailyChallengeId`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `LastDailyChallengeId`,
    ADD COLUMN `LastHintId` INTEGER NULL,
    ADD COLUMN `daily_challengeDailyChallengeId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `fk_LastHintId` ON `users`(`LastHintId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_LastHintId` FOREIGN KEY (`LastHintId`) REFERENCES `hints`(`HintId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_daily_challengeDailyChallengeId_fkey` FOREIGN KEY (`daily_challengeDailyChallengeId`) REFERENCES `daily_challenge`(`DailyChallengeId`) ON DELETE SET NULL ON UPDATE CASCADE;
