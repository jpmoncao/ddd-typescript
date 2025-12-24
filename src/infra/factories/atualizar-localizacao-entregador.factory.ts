import { prisma } from "../database/prisma/client";
import { PrismaEntregaRepository } from "../database/prisma/repositories/prisma-entrega.repository"
import { AtualizarLocalizacaoEntregadorController } from "../http/controllers/atualizar-localizacao-entregador.controller";
import { AtualizarLocalizacaoEntregadorUseCase } from "../../application/use-cases/atualizar-localizacao-entregador.usecase";
import { RedisCacheProvider } from "../providers/redis-cache.provider";
import { RedisEntregaRepository } from "../database/redis/repositories/redis-entregas.repository";

export function atualizarLocalizacaoEntregadorFactory(): AtualizarLocalizacaoEntregadorController {
    // DB Repository
    const repository = new PrismaEntregaRepository(prisma);

    // Cache Repository
    const cacheProvider = new RedisCacheProvider();
    const entregaCacheRepository = new RedisEntregaRepository(cacheProvider);

    const useCase = new AtualizarLocalizacaoEntregadorUseCase(repository, entregaCacheRepository);
    const controller = new AtualizarLocalizacaoEntregadorController(useCase);
    return controller;
}