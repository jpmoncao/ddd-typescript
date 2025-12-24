import { prisma } from "../database/prisma/client";
import { PrismaEntregaRepository } from "../database/prisma/repositories/prisma-entrega.repository"
import { PrismaDestinatarioRepository } from "../database/prisma/repositories/prisma-destinatario.repository";
import { EnviarEmailEntregaConcluidaHandler } from "../../application/handlers/enviar-email-entrega-concluida.handler";
import { DomainEventDispatcher } from "../../core/events/dispatcher";
import { ConcluirEntregaUseCase } from "../../application/use-cases/concluir-entrega.usecase";
import { ConcluirEntregaController } from "../http/controllers/concluir-entrega.controller";
import { EntregaConcluidaEvent } from "../../domain/events/entrega-concluida.event";
import { DiskStorageGateway } from "../gateway/disk-storage.gateway";
import { EmailQueue } from "../jobs/queues/email.queue";
import { RedisCacheProvider } from "../providers/redis-cache.provider";
import { RedisEntregaRepository } from "../database/redis/repositories/redis-entregas.repository";

export function concluirEntregaFactory(): ConcluirEntregaController {
    // Repositories
    const entregaRepository = new PrismaEntregaRepository(prisma);
    const destinatarioRepository = new PrismaDestinatarioRepository(prisma);

    // Cache Repository
    const cacheProvider = new RedisCacheProvider();
    const entregaCacheRepository = new RedisEntregaRepository(cacheProvider);

    // Gateways
    const storage = new DiskStorageGateway();
    const queue = new EmailQueue();

    // Event Handler
    const handler = new EnviarEmailEntregaConcluidaHandler(destinatarioRepository, queue);

    // Events Dispather
    const dispatcher = new DomainEventDispatcher();
    dispatcher.register(EntregaConcluidaEvent.eventName, handler.handle);

    const useCase = new ConcluirEntregaUseCase(entregaRepository, dispatcher, storage, entregaCacheRepository);
    const controller = new ConcluirEntregaController(useCase);
    return controller;
}