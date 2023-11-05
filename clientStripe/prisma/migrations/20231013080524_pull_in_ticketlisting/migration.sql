/*
  Warnings:

  - Added the required column `price` to the `custorder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `custorder` ADD COLUMN `date` DATE NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `displayImage` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `contactNum` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `run` (
    `runID` BIGINT NOT NULL,
    `date` DATE NULL,
    `endTime` VARCHAR(255) NULL,
    `startTime` VARCHAR(255) NULL,
    `eventID` BIGINT NULL,

    INDEX `FKni6xubxc2bq4lmaxubip68iy4`(`eventID`),
    PRIMARY KEY (`runID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticketlisting` (
    `listingID` BIGINT NOT NULL AUTO_INCREMENT,
    `listingDate` DATETIME(6) NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `status` VARCHAR(255) NULL,
    `ticketID` BIGINT NULL,
    `transactionID` BIGINT NULL,
    `userID` BIGINT NULL,
    `eventID` BIGINT NULL,
    `runID` BIGINT NULL,

    UNIQUE INDEX `UK_4vy5x6o4q6m3y4rppqavccbn2`(`transactionID`),
    INDEX `FK19h0ku2x5pr7s75w0s7sbon6g`(`runID`),
    INDEX `FKnflg4egmodkj1gmynr3s0fpkh`(`userID`),
    INDEX `FKooydwf1a56axoqvpgt3ovokts`(`eventID`),
    INDEX `FKpqqii5jlk6yp4hrcfehu7hrc`(`ticketID`),
    PRIMARY KEY (`listingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
