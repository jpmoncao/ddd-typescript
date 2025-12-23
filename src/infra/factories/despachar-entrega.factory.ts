import { prisma } from "../database/prisma/client";
import { PrismaEntregaRepository } from "../database/prisma/repositories/prisma-entrega.repository"
import { PrismaEntregadorRepository } from "../database/prisma/repositories/prisma-entregador.repository"
import { PrismaDestinatarioRepository } from "../database/prisma/repositories/prisma-destinatario.repository";
import { EnviarEmailDespachoHandler } from "../../application/handlers/enviar-email-despacho.handler";
import { DomainEventDispatcher } from "../../core/events/dispatcher";
import { DespacharEntregaUseCase } from "../../application/use-cases/despachar-entrega.usecase";
import { DespacharEntregaController } from "../http/controllers/despachar-entrega.controller";
import { EntregaDespachadaEvent } from "../../domain/events/entrega-despachada.event";
import { EmailQueue } from "../jobs/queues/email.queue";

export function despacharEntregaFactory(): DespacharEntregaController {
    // Repositories
    const entregaRepository = new PrismaEntregaRepository(prisma);
    const entregadorRepository = new PrismaEntregadorRepository(prisma);
    const destinatarioRepository = new PrismaDestinatarioRepository(prisma);

    // Gateways
    const queue = new EmailQueue();

    // Event Handler
    const handler = new EnviarEmailDespachoHandler(destinatarioRepository, queue);

    // Events Dispatcher
    const dispatcher = new DomainEventDispatcher();
    dispatcher.register(EntregaDespachadaEvent.eventName, handler.handle);

    const useCase = new DespacharEntregaUseCase(entregaRepository, entregadorRepository, dispatcher);
    const controller = new DespacharEntregaController(useCase);
    return controller;
}