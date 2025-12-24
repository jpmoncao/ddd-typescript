import z from 'zod';
import { Request, Response } from 'express';

import { RouteDocsConfig } from '../docs/describe-route';
import HttpStatusCode from '../utils/status-code';

import { BaseController } from '../../../core/base/controller'
import { AutenticarDestinatarioUseCase } from "../../../application/use-cases/autenticar-destinatario.usecase";
import { autenticarDestinatarioBodySchema } from '../../../application/dtos/autenticar-destinatario.dto';

export class AutenticarDestinatarioController extends BaseController {
    constructor(private autenticarDestinatarioUseCase: AutenticarDestinatarioUseCase) { super() }

    public docs: RouteDocsConfig = {
        summary: 'Efetuar login do destinatário',
        tags: ['Destinatários'],
        body: autenticarDestinatarioBodySchema,
        response: {
            [HttpStatusCode.OK]: {
                description: 'Login efetuado com sucesso!',
                schema: z.object({ token: z.jwt() })
            }
        }
    };

    handle = async (req: Request, res: Response) => {
        try {
            const { email, senha } = autenticarDestinatarioBodySchema.parse(req.body);

            const { token } = await this.autenticarDestinatarioUseCase.execute({ email, senha });

            return this.ok(res, "Login efetuado com sucesso!", { token });
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}