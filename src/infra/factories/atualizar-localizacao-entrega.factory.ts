import { prisma } from "../database/prisma/client";
import { PrismaEntregaRepository } from "../database/prisma/repositories/prisma-entrega.repository"
import { AtualizarLocalizacaoEntregaUseCase } from "../../application/use-cases/atualizar-localizacao-entrega.usecase";
import { AtualizarLocalizacaoEntregaController } from "../http/controllers/atualizar-localizacao-entrega.controller";
import { RedisCacheProvider } from "../providers/redis-cache.provider";
import { RedisEntregaRepository } from "../database/redis/repositories/redis-entregas.repository";

export function atualizarLocalizacaoEntregaFactory(): AtualizarLocalizacaoEntregaController {
    // DB Repository
    const repository = new PrismaEntregaRepository(prisma);

    // Cache Repository
    const cacheProvider = new RedisCacheProvider();
    const entregaCacheRepository = new RedisEntregaRepository(cacheProvider);

    const useCase = new AtualizarLocalizacaoEntregaUseCase(repository, entregaCacheRepository);
    const controller = new AtualizarLocalizacaoEntregaController(useCase);

    return controller;
}