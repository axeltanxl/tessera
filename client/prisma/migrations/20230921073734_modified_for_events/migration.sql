-- AlterTable
ALTER TABLE `event` ADD COLUMN `name` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `custorder` (
    `orderID` BIGINT NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL,
    `ticketQuantity` INTEGER NOT NULL,
    `eventID` BIGINT NULL,
    `userID` BIGINT NULL,

    INDEX `FKi095hldqf17n9kcpp26ghex2o`(`userID`),
    INDEX `FKr6tkc9du1r50obuqt1h761d2y`(`eventID`),
    PRIMARY KEY (`orderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seat` (
    `seatID` BIGINT NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(255) NULL,
    `seatRow` VARCHAR(255) NULL,
    `seatNo` INTEGER NOT NULL,
    `section` VARCHAR(255) NULL,
    `venueID` BIGINT NULL,

    INDEX `FKfj8lt431up6yqyeakinimp591`(`venueID`),
    PRIMARY KEY (`seatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `FKb33lw05499g9grnvp6ufpjjwg` ON `payment`(`orderId`);

-- CreateIndex
CREATE INDEX `FKjuy4c1esbrpokuwgg5v2fuudt` ON `ticket`(`seatId`);

-- CreateIndex
CREATE INDEX `FKks8gd5eaa20qau296r9fgcc9n` ON `ticket`(`orderId`);
