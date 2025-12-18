import { JwtEncrypter } from "../cryptography/jwt-encrypter";
import { BcryptComparer } from "../cryptography/bcrypt-comparer";
import { PrismaEntregadorRepository } from "../database/prisma/repositories/prisma-entregador.repository"
import { AutenticarEntregadorController } from "../http/controllers/autenticar-entregador.controller";
import { AutenticarEntregadorUseCase } from "../../application/use-cases/autenticar-entregador.usecase";
import { prisma } from "../database/prisma/client";

export function autenticarEntregadorFactory(): AutenticarEntregadorController {
    const repository = new PrismaEntregadorRepository(prisma);
    const encrypter = new JwtEncrypter();
    const comparer = new BcryptComparer();
    const useCase = new AutenticarEntregadorUseCase(repository, encrypter, comparer);
    const controller = new AutenticarEntregadorController(useCase);
    return controller;
}