import { prisma } from "../database/prisma/client";
import { PrismaEntregaRepository } from "../database/prisma/repositories/prisma-entrega.repository"
import { PrismaDestinatarioRepository } from "../database/prisma/repositories/prisma-destinatario.repository";
import { EnviarEmailEntregaConcluidaHandler } from "../../application/handlers/enviar-email-entrega-concluida.handler";
import { DomainEventDispatcher } from "../../core/events/dispatcher";
import { ConcluirEntregaUseCase } from "../../application/use-cases/concluir-entrega.usecase";
import { ConcluirEntregaController } from "../http/controllers/concluir-entrega.controller";
import { EntregaConcluidaEvent } from "../../domain/events/entrega-concluida.event";
import { DiskStorageGateway } from "../gateway/disk-storage.gateway";
import { NodemailerMailGateway } from "../gateway/nodemailer-mail.gateway";

export function concluirEntregaFactory(): ConcluirEntregaController {
    const entregaRepository = new PrismaEntregaRepository(prisma);
    const destinatarioRepository = new PrismaDestinatarioRepository(prisma);

    const mailGateway = new NodemailerMailGateway();

    const handler = new EnviarEmailEntregaConcluidaHandler(destinatarioRepository, mailGateway);

    const dispatcher = new DomainEventDispatcher();
    dispatcher.register(EntregaConcluidaEvent.eventName, handler.handle);

    const storage = new DiskStorageGateway();

    const useCase = new ConcluirEntregaUseCase(entregaRepository, dispatcher, storage);
    const controller = new ConcluirEntregaController(useCase);

    return controller;
}