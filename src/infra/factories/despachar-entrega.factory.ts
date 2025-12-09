import { PrismaEntregaRepository } from "../database/prisma/repositories/prisma-entrega.repository"
import { DespacharEntregaUseCase } from "../../application/use-cases/despachar-entrega.usecase";
import { DespacharEntregaController } from "../http/controllers/despachar-entrega.controller";
import { prisma } from "../database/prisma/client";

export function despacharEntregaFactory(): DespacharEntregaController {
    const repository = new PrismaEntregaRepository(prisma);
    const useCase = new DespacharEntregaUseCase(repository);
    const controller = new DespacharEntregaController(useCase);

    return controller;
}