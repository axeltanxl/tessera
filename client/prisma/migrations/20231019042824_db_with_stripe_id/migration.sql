-- AlterTable
ALTER TABLE `custorder` ADD COLUMN `runID` BIGINT NULL,
    ADD COLUMN `stripeOrderID` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `stripePaymentID` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `user` BIGINT NULL;

-- AlterTable
ALTER TABLE `ticketlisting` ADD COLUMN `marketplaceID` BIGINT NULL;

-- CreateIndex
CREATE INDEX `FKif7961o0kcvcdtu367120seoi` ON `custorder`(`runID`);

-- CreateIndex
CREATE INDEX `FK31v9d9hvriiws3dhl0cw28x5f` ON `ticket`(`user`);

-- CreateIndex
CREATE INDEX `FK91beud6r09v7ry2gbxpw94jo6` ON `ticketlisting`(`marketplaceID`);
