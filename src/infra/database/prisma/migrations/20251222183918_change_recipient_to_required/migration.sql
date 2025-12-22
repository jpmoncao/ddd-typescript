/*
  Warnings:

  - Made the column `destinatarioId` on table `entregas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `entregas` DROP FOREIGN KEY `entregas_destinatarioId_fkey`;

-- AlterTable
ALTER TABLE `entregas` MODIFY `destinatarioId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `entregas` ADD CONSTRAINT `entregas_destinatarioId_fkey` FOREIGN KEY (`destinatarioId`) REFERENCES `destinatarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
