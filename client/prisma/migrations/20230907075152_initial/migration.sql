-- CreateTable
CREATE TABLE `event` (
    `duration` INTEGER NOT NULL,
    `endDate` DATE NULL,
    `maxSlots` INTEGER NOT NULL,
    `startDate` DATE NULL,
    `eventID` BIGINT NOT NULL AUTO_INCREMENT,
    `venueId` BIGINT NULL,
    `category` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `pricePerCategory` VARCHAR(255) NULL,

    INDEX `FK8dsn6rcp0jul7b1n6ptqq254u`(`venueId`),
    PRIMARY KEY (`eventID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `isSuccessful` INTEGER NOT NULL,
    `orderId` BIGINT NULL,
    `paymentID` BIGINT NOT NULL AUTO_INCREMENT,
    `transactionId` BIGINT NULL,
    `paymentMethod` VARCHAR(255) NULL,

    INDEX `FKcxjivqinmjlvl5kf7drm3v0x1`(`transactionId`),
    PRIMARY KEY (`paymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket` (
    `orderId` BIGINT NULL,
    `seatId` BIGINT NULL,
    `ticketId` BIGINT NOT NULL AUTO_INCREMENT,
    `uniqueCode` VARCHAR(255) NULL,

    PRIMARY KEY (`ticketId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `buyerId` BIGINT NULL,
    `date` DATETIME(6) NULL,
    `sellerId` BIGINT NULL,
    `ticketId` BIGINT NULL,
    `transactionId` BIGINT NOT NULL AUTO_INCREMENT,

    INDEX `FK4yye6rl1o135ufx6apdoso1wy`(`ticketId`),
    INDEX `FKf3ici1pjsybx245j0r04870qe`(`sellerId`),
    INDEX `FKlnek713drw6aw7t88xgod6hai`(`buyerId`),
    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `contactNum` INTEGER NOT NULL,
    `userID` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `role` ENUM('ADMIN', 'USER') NULL,

    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venue` (
    `capacity` INTEGER NOT NULL,
    `venueId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`venueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
