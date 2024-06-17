-- CreateTable
CREATE TABLE `daily_challenge` (
    `DailyChallengeId` INTEGER NOT NULL AUTO_INCREMENT,
    `Number` INTEGER NOT NULL,
    `Date` DATETIME(0) NOT NULL,

    PRIMARY KEY (`DailyChallengeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hints` (
    `HintId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Difficulty` INTEGER NOT NULL,
    `DailyChallengeId` INTEGER NOT NULL,

    INDEX `fk_DailyChallengeId`(`DailyChallengeId`),
    PRIMARY KEY (`HintId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `UserId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `Country` INTEGER NOT NULL,
    `TotalPoints` INTEGER NULL DEFAULT 0,
    `LastDailyChallengeId` INTEGER NULL,

    UNIQUE INDEX `Name`(`Name`),
    INDEX `fk_LastDailyChallengeId`(`LastDailyChallengeId`),
    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hints` ADD CONSTRAINT `fk_DailyChallengeId` FOREIGN KEY (`DailyChallengeId`) REFERENCES `daily_challenge`(`DailyChallengeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_LastDailyChallengeId` FOREIGN KEY (`LastDailyChallengeId`) REFERENCES `daily_challenge`(`DailyChallengeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
