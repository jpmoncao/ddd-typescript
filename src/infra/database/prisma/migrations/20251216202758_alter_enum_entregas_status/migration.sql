/*
  Warnings:

  - The values [ENTREGUE] on the enum `entregas_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `entregas` MODIFY `status` ENUM('PENDENTE', 'CAMINHO', 'CONCLUIDO') NOT NULL DEFAULT 'PENDENTE';
