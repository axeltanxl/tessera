/*
  Warnings:

  - A unique constraint covering the columns `[marketplace_id]` on the table `run` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `run` ADD COLUMN `marketplace_id` BIGINT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `stripeUserID` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `marketplace` (
    `marketplaceID` BIGINT NOT NULL,
    `closingDate` DATE NULL,
    `openingDate` DATE NULL,
    `status` VARCHAR(255) NULL,

    PRIMARY KEY (`marketplaceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `UK_bmke6kuuntpjbd88yu4cju2ie` ON `run`(`marketplace_id`);
