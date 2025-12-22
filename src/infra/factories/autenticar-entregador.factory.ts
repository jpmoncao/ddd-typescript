import { JwtEncrypter } from "../cryptography/jwt-encrypter";
import { BcryptHasher } from "../cryptography/bcrypt-hasher";
import { PrismaEntregadorRepository } from "../database/prisma/repositories/prisma-entregador.repository"
import { AutenticarEntregadorController } from "../http/controllers/autenticar-entregador.controller";
import { AutenticarEntregadorUseCase } from "../../application/use-cases/autenticar-entregador.usecase";
import { prisma } from "../database/prisma/client";

export function autenticarEntregadorFactory(): AutenticarEntregadorController {
    const encrypter = new JwtEncrypter();
    const hasher = new BcryptHasher();

    const repository = new PrismaEntregadorRepository(prisma);
    const useCase = new AutenticarEntregadorUseCase(repository, encrypter, hasher);
    const controller = new AutenticarEntregadorController(useCase);

    return controller;
}