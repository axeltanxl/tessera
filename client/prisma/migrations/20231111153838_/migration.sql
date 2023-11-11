-- CreateTable
CREATE TABLE `CustOrder` (
    `date` DATE NULL,
    `price` INTEGER NOT NULL,
    `ticketQuantity` INTEGER NOT NULL,
    `orderID` BIGINT NOT NULL AUTO_INCREMENT,
    `runID` BIGINT NULL,
    `userID` BIGINT NULL,
    `stripeOrderID` VARCHAR(255) NULL,
    `ticketCategory` VARCHAR(255) NULL,

    INDEX `FKi095hldqf17n9kcpp26ghex2o`(`userID`),
    INDEX `FKif7961o0kcvcdtu367120seoi`(`runID`),
    PRIMARY KEY (`orderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `duration` INTEGER NOT NULL,
    `endDate` DATE NULL,
    `maxSlots` INTEGER NOT NULL,
    `startDate` DATE NULL,
    `eventID` BIGINT NOT NULL AUTO_INCREMENT,
    `venueID` BIGINT NULL,
    `category` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `displayImage` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `pricePerCategory` VARCHAR(255) NULL,

    INDEX `FKfkg0rjjt6ca7ck5mojidks7r7`(`venueID`),
    PRIMARY KEY (`eventID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Marketplace` (
    `closingDate` DATE NULL,
    `openingDate` DATE NULL,
    `marketplaceID` BIGINT NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(255) NULL,

    PRIMARY KEY (`marketplaceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `orderID` BIGINT NULL,
    `paymentID` BIGINT NOT NULL AUTO_INCREMENT,
    `transactionID` BIGINT NULL,
    `paymentMethod` VARCHAR(255) NULL,
    `stripePaymentID` VARCHAR(255) NULL,

    INDEX `FKb33lw05499g9grnvp6ufpjjwg`(`orderID`),
    INDEX `FKmuaxt57agmtuiovehhauvchmq`(`transactionID`),
    PRIMARY KEY (`paymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Run` (
    `date` DATE NULL,
    `eventID` BIGINT NULL,
    `marketplaceID` BIGINT NULL,
    `runID` BIGINT NOT NULL,
    `endTime` VARCHAR(255) NULL,
    `startTime` VARCHAR(255) NULL,

    UNIQUE INDEX `UK_mn6t8ii8gtxh4v7tpijo9tp1u`(`marketplaceID`),
    INDEX `FKni6xubxc2bq4lmaxubip68iy4`(`eventID`),
    PRIMARY KEY (`runID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RunSeat` (
    `isAvailable` INTEGER NOT NULL,
    `runID` BIGINT NULL,
    `runSeatID` BIGINT NOT NULL,
    `seatID` BIGINT NULL,

    INDEX `FKh6tp2yhl9b0d8fvpxi7bhj8u6`(`seatID`),
    INDEX `FKinvugr5jyeivvcqjke0idlg8e`(`runID`),
    PRIMARY KEY (`runSeatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat` (
    `seatNo` INTEGER NOT NULL,
    `seatID` BIGINT NOT NULL AUTO_INCREMENT,
    `venueID` BIGINT NULL,
    `category` VARCHAR(255) NULL,
    `seatRow` VARCHAR(255) NULL,
    `section` VARCHAR(255) NULL,

    INDEX `FKfj8lt431up6yqyeakinimp591`(`venueID`),
    PRIMARY KEY (`seatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `orderID` BIGINT NULL,
    `seatID` BIGINT NULL,
    `ticketID` BIGINT NOT NULL AUTO_INCREMENT,
    `userID` BIGINT NULL,
    `uniqueCode` VARCHAR(255) NULL,

    INDEX `FKc16fvc0gd76qdgro0au29h8ab`(`userID`),
    INDEX `FKjuy4c1esbrpokuwgg5v2fuudt`(`seatID`),
    INDEX `FKks8gd5eaa20qau296r9fgcc9n`(`orderID`),
    PRIMARY KEY (`ticketID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketListing` (
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL,
    `eventID` BIGINT NULL,
    `listingDate` DATETIME(6) NULL,
    `listingID` BIGINT NOT NULL AUTO_INCREMENT,
    `marketplaceID` BIGINT NULL,
    `runID` BIGINT NULL,
    `ticketID` BIGINT NULL,
    `transactionID` BIGINT NULL,
    `userID` BIGINT NULL,
    `status` VARCHAR(255) NULL,

    UNIQUE INDEX `UK_4vy5x6o4q6m3y4rppqavccbn2`(`transactionID`),
    INDEX `FK19h0ku2x5pr7s75w0s7sbon6g`(`runID`),
    INDEX `FK91beud6r09v7ry2gbxpw94jo6`(`marketplaceID`),
    INDEX `FKnflg4egmodkj1gmynr3s0fpkh`(`userID`),
    INDEX `FKooydwf1a56axoqvpgt3ovokts`(`eventID`),
    INDEX `FKpqqii5jlk6yp4hrcfehu7hrc`(`ticketID`),
    PRIMARY KEY (`listingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `buyerID` BIGINT NULL,
    `date` DATETIME(6) NULL,
    `sellerID` BIGINT NULL,
    `ticketID` BIGINT NULL,
    `transactionID` BIGINT NOT NULL AUTO_INCREMENT,

    INDEX `FK2nlddhdsd1n20718nunwqyp69`(`sellerID`),
    INDEX `FK7j96qpqvnqa1wplxx8g64t1x4`(`buyerID`),
    INDEX `FKdcjhq8tyb6mwfawkmomggmlag`(`ticketID`),
    PRIMARY KEY (`transactionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userID` BIGINT NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(255) NULL,
    `contactNum` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NULL,
    `stripeUserID` VARCHAR(255) NULL,

    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venue` (
    `capacity` INTEGER NOT NULL,
    `venueID` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`venueID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustOrder` ADD CONSTRAINT `FKi095hldqf17n9kcpp26ghex2o` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CustOrder` ADD CONSTRAINT `FKif7961o0kcvcdtu367120seoi` FOREIGN KEY (`runID`) REFERENCES `Run`(`runID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `FKfkg0rjjt6ca7ck5mojidks7r7` FOREIGN KEY (`venueID`) REFERENCES `Venue`(`venueID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `FKb33lw05499g9grnvp6ufpjjwg` FOREIGN KEY (`orderID`) REFERENCES `CustOrder`(`orderID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `FKmuaxt57agmtuiovehhauvchmq` FOREIGN KEY (`transactionID`) REFERENCES `Transaction`(`transactionID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Run` ADD CONSTRAINT `FKni6xubxc2bq4lmaxubip68iy4` FOREIGN KEY (`eventID`) REFERENCES `Event`(`eventID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Run` ADD CONSTRAINT `FKomva2tdc0y2hlbjmjhf7snac6` FOREIGN KEY (`marketplaceID`) REFERENCES `Marketplace`(`marketplaceID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RunSeat` ADD CONSTRAINT `FKh6tp2yhl9b0d8fvpxi7bhj8u6` FOREIGN KEY (`seatID`) REFERENCES `Seat`(`seatID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `RunSeat` ADD CONSTRAINT `FKinvugr5jyeivvcqjke0idlg8e` FOREIGN KEY (`runID`) REFERENCES `Run`(`runID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `FKfj8lt431up6yqyeakinimp591` FOREIGN KEY (`venueID`) REFERENCES `Venue`(`venueID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `FKc16fvc0gd76qdgro0au29h8ab` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `FKjuy4c1esbrpokuwgg5v2fuudt` FOREIGN KEY (`seatID`) REFERENCES `Seat`(`seatID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `FKks8gd5eaa20qau296r9fgcc9n` FOREIGN KEY (`orderID`) REFERENCES `CustOrder`(`orderID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TicketListing` ADD CONSTRAINT `FK19h0ku2x5pr7s75w0s7sbon6g` FOREIGN KEY (`runID`) REFERENCES `Run`(`runID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TicketListing` ADD CONSTRAINT `FK91beud6r09v7ry2gbxpw94jo6` FOREIGN KEY (`marketplaceID`) REFERENCES `Marketplace`(`marketplaceID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TicketListing` ADD CONSTRAINT `FKfo89abcodmfkldum7l1a582cy` FOREIGN KEY (`transactionID`) REFERENCES `Transaction`(`transactionID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TicketListing` ADD CONSTRAINT `FKnflg4egmodkj1gmynr3s0fpkh` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TicketListing` ADD CONSTRAINT `FKooydwf1a56axoqvpgt3ovokts` FOREIGN KEY (`eventID`) REFERENCES `Event`(`eventID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TicketListing` ADD CONSTRAINT `FKpqqii5jlk6yp4hrcfehu7hrc` FOREIGN KEY (`ticketID`) REFERENCES `Ticket`(`ticketID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `FK2nlddhdsd1n20718nunwqyp69` FOREIGN KEY (`sellerID`) REFERENCES `User`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `FK7j96qpqvnqa1wplxx8g64t1x4` FOREIGN KEY (`buyerID`) REFERENCES `User`(`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `FKdcjhq8tyb6mwfawkmomggmlag` FOREIGN KEY (`ticketID`) REFERENCES `Ticket`(`ticketID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
