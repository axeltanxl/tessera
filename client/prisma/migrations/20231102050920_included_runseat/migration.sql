-- AlterTable
ALTER TABLE `marketplace` MODIFY `marketplaceID` BIGINT NOT NULL AUTO_INCREMENT;

-- CreateTable
CREATE TABLE `runseat` (
    `runSeatID` BIGINT NOT NULL,
    `isAvailable` INTEGER NOT NULL,
    `runID` BIGINT NULL,
    `seatID` BIGINT NULL,

    INDEX `FKh6tp2yhl9b0d8fvpxi7bhj8u6`(`seatID`),
    INDEX `FKinvugr5jyeivvcqjke0idlg8e`(`runID`),
    PRIMARY KEY (`runSeatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
