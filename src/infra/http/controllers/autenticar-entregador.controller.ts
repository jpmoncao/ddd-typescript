import z from 'zod';
import { Request, Response } from 'express';

import { RouteDocsConfig } from '../docs/describe-route';
import HttpStatusCode from '../utils/status-code';

import { BaseController } from '../../../core/base/controller'
import { AutenticarEntregadorUseCase } from "../../../application/use-cases/autenticar-entregador.usecase";

const autenticarEntregadorBodySchema = z.object({
    email: z.email({ message: "Email inválido" }),
    senha: z.string({ message: "Senha inválida" }).min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
});

export class AutenticarEntregadorController extends BaseController {
    constructor(private autenticarEntregadorUseCase: AutenticarEntregadorUseCase) { super() }

    public docs: RouteDocsConfig = {
        summary: 'Efetuar login do entregador',
        tags: ['Entregadores'],
        body: autenticarEntregadorBodySchema,
        response: {
            [HttpStatusCode.OK]: {
                description: 'Login efetuado com sucesso!',
                schema: z.object({ token: z.jwt() })
            }
        }
    };

    handle = async (req: Request, res: Response) => {
        try {
            const { email, senha } = autenticarEntregadorBodySchema.parse(req.body);

            const { token } = await this.autenticarEntregadorUseCase.execute({ email, senha });

            return this.ok(res, "Login efetuado com sucesso!", { token });
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}