/*
  Warnings:

  - You are about to drop the column `eventID` on the `custorder` table. All the data in the column will be lost.
  - You are about to drop the column `isSuccessful` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `marketplace_id` on the `run` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[marketplaceID]` on the table `run` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `FKr6tkc9du1r50obuqt1h761d2y` ON `custorder`;

-- DropIndex
DROP INDEX `UK_bmke6kuuntpjbd88yu4cju2ie` ON `run`;

-- DropIndex
DROP INDEX `FK31v9d9hvriiws3dhl0cw28x5f` ON `ticket`;

-- AlterTable
ALTER TABLE `custorder` DROP COLUMN `eventID`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `isSuccessful`;

-- AlterTable
ALTER TABLE `run` DROP COLUMN `marketplace_id`,
    ADD COLUMN `marketplaceID` BIGINT NULL;

-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `user`,
    ADD COLUMN `userID` BIGINT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UK_mn6t8ii8gtxh4v7tpijo9tp1u` ON `run`(`marketplaceID`);

-- CreateIndex
CREATE INDEX `FKc16fvc0gd76qdgro0au29h8ab` ON `ticket`(`userID`);
