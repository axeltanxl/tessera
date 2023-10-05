/*
  Warnings:

  - You are about to drop the column `venueId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `payment` table. All the data in the column will be lost.
  - The primary key for the `ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `seatId` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `ticket` table. All the data in the column will be lost.
  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `buyerId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `transaction` table. All the data in the column will be lost.
  - The primary key for the `venue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `venueId` on the `venue` table. All the data in the column will be lost.
  - Added the required column `price` to the `custorder` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ticketID` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionID` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `venueID` to the `venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `FK8dsn6rcp0jul7b1n6ptqq254u` ON `event`;

-- DropIndex
DROP INDEX `FKb33lw05499g9grnvp6ufpjjwg` ON `payment`;

-- DropIndex
DROP INDEX `FKcxjivqinmjlvl5kf7drm3v0x1` ON `payment`;

-- DropIndex
DROP INDEX `FKjuy4c1esbrpokuwgg5v2fuudt` ON `ticket`;

-- DropIndex
DROP INDEX `FKks8gd5eaa20qau296r9fgcc9n` ON `ticket`;

-- DropIndex
DROP INDEX `FK4yye6rl1o135ufx6apdoso1wy` ON `transaction`;

-- DropIndex
DROP INDEX `FKf3ici1pjsybx245j0r04870qe` ON `transaction`;

-- DropIndex
DROP INDEX `FKlnek713drw6aw7t88xgod6hai` ON `transaction`;

-- AlterTable
ALTER TABLE `custorder` ADD COLUMN `price` INTEGER NOT NULL,
    MODIFY `ticketCategory` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `venueId`,
    ADD COLUMN `venueID` BIGINT NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `orderId`,
    DROP COLUMN `transactionId`,
    ADD COLUMN `orderID` BIGINT NULL,
    ADD COLUMN `transactionID` BIGINT NULL;

-- AlterTable
ALTER TABLE `ticket` DROP PRIMARY KEY,
    DROP COLUMN `orderId`,
    DROP COLUMN `seatId`,
    DROP COLUMN `ticketId`,
    ADD COLUMN `orderID` BIGINT NULL,
    ADD COLUMN `seatID` BIGINT NULL,
    ADD COLUMN `ticketID` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ticketID`);

-- AlterTable
ALTER TABLE `transaction` DROP PRIMARY KEY,
    DROP COLUMN `buyerId`,
    DROP COLUMN `sellerId`,
    DROP COLUMN `ticketId`,
    DROP COLUMN `transactionId`,
    ADD COLUMN `buyerID` BIGINT NULL,
    ADD COLUMN `sellerID` BIGINT NULL,
    ADD COLUMN `ticketID` BIGINT NULL,
    ADD COLUMN `transactionID` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`transactionID`);

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `venue` DROP PRIMARY KEY,
    DROP COLUMN `venueId`,
    ADD COLUMN `venueID` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`venueID`);

-- CreateIndex
CREATE INDEX `FKfkg0rjjt6ca7ck5mojidks7r7` ON `event`(`venueID`);

-- CreateIndex
CREATE INDEX `FKb33lw05499g9grnvp6ufpjjwg` ON `payment`(`orderID`);

-- CreateIndex
CREATE INDEX `FKmuaxt57agmtuiovehhauvchmq` ON `payment`(`transactionID`);

-- CreateIndex
CREATE INDEX `FKjuy4c1esbrpokuwgg5v2fuudt` ON `ticket`(`seatID`);

-- CreateIndex
CREATE INDEX `FKks8gd5eaa20qau296r9fgcc9n` ON `ticket`(`orderID`);

-- CreateIndex
CREATE INDEX `FK2nlddhdsd1n20718nunwqyp69` ON `transaction`(`sellerID`);

-- CreateIndex
CREATE INDEX `FK7j96qpqvnqa1wplxx8g64t1x4` ON `transaction`(`buyerID`);

-- CreateIndex
CREATE INDEX `FKdcjhq8tyb6mwfawkmomggmlag` ON `transaction`(`ticketID`);
