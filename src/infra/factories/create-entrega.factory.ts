import { prisma } from "../database/prisma/client";
import { PrismaEntregaRepository } from "../database/prisma/repositories/prisma-entrega.repository"
import { PrismaDestinatarioRepository } from "../database/prisma/repositories/prisma-destinatario.repository";
import { CreateEntregaUseCase } from "../../application/use-cases/create-entrega.usecase";
import { CreateEntregaController } from "../http/controllers/create-entrega.controller";

export function createEntregaFactory(): CreateEntregaController {
    const entregaRepository = new PrismaEntregaRepository(prisma);
    const destinatarioRepository = new PrismaDestinatarioRepository(prisma);

    const useCase = new CreateEntregaUseCase(entregaRepository, destinatarioRepository);
    const controller = new CreateEntregaController(useCase);

    return controller;
}