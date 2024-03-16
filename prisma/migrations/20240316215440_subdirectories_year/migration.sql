/*
  Warnings:

  - You are about to drop the `subdirectoryyear` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `subdirectoryyear` DROP FOREIGN KEY `SubDirectoryYear_subDirectoryId_fkey`;

-- DropTable
DROP TABLE `subdirectoryyear`;

-- CreateTable
CREATE TABLE `subdirectory_year` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `subDirectoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subdirectory_year` ADD CONSTRAINT `subdirectory_year_subDirectoryId_fkey` FOREIGN KEY (`subDirectoryId`) REFERENCES `SubDirectory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
