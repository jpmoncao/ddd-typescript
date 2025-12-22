import { BcryptHasher } from "../cryptography/bcrypt-hasher";
import { PrismaEntregadorRepository } from "../database/prisma/repositories/prisma-entregador.repository"
import { CreateEntregadorUseCase } from "../../application/use-cases/create-entregador.usecase";
import { CreateEntregadorController } from "../http/controllers/create-entregador.controller";
import { prisma } from "../database/prisma/client";

export function createEntregadorFactory(): CreateEntregadorController {
    const encrypter = new BcryptHasher();

    const repository = new PrismaEntregadorRepository(prisma);
    const useCase = new CreateEntregadorUseCase(repository, encrypter);
    const controller = new CreateEntregadorController(useCase);

    return controller;
}