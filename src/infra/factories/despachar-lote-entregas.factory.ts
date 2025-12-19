import { prisma } from "../database/prisma/client";
import { PrismaEntregaRepository } from "../database/prisma/repositories/prisma-entrega.repository"
import { PrismaEntregadorRepository } from "../database/prisma/repositories/prisma-entregador.repository"
import { DomainEventDispatcher } from "../../core/events/dispatcher";
import { enviarEmailDespachoHandler } from "../../application/handlers/enviar-email-despacho.handler";
import { DespacharLoteEntregasController } from "../http/controllers/despachar-lote-entregas.controller";
import { DespacharLoteEntregasUseCase } from "../../application/use-cases/despachar-lote-entregas.usecase";
import { EntregaDespachadaEvent } from "../../domain/events/entrega-despachada.event";

export function despacharLoteEntregasFactory(): DespacharLoteEntregasController {
    const entregaRepository = new PrismaEntregaRepository(prisma);
    const entregadorRepository = new PrismaEntregadorRepository(prisma);

    const dispatcher = new DomainEventDispatcher();
    dispatcher.register(EntregaDespachadaEvent.eventName, enviarEmailDespachoHandler)

    const useCase = new DespacharLoteEntregasUseCase(entregaRepository, entregadorRepository, dispatcher);
    const controller = new DespacharLoteEntregasController(useCase);

    return controller;
}