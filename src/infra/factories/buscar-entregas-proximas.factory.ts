import { BuscarEntregasProximasUseCase } from "../../application/use-cases/buscar-entregas-proximas.usecase";
import { PrismaEntregaRepository } from "../database/prisma/repositories/prisma-entrega.repository";
import { PrismaEntregadorRepository } from "../database/prisma/repositories/prisma-entregador.repository";
import { BuscarEntregasProximasController } from "../http/controllers/buscar-entregas-proximas.controller";
import { prisma } from "../database/prisma/client";

export function buscarEntregasProximasFactory(): BuscarEntregasProximasController {
    const entregadorRepository = new PrismaEntregadorRepository(prisma);
    const entregaRepository = new PrismaEntregaRepository(prisma);
    const usecase = new BuscarEntregasProximasUseCase(entregadorRepository, entregaRepository);
    const controller = new BuscarEntregasProximasController(usecase);

    return controller;
}