import z from 'zod';
import { Request, Response } from 'express';

import { RouteDocsConfig } from '../docs/describe-route';
import HttpStatusCode from '../utils/status-code';

import { BaseController } from '../../../core/base/controller'
import { CreateDestinatarioUseCase } from "../../../application/use-cases/create-destinatario.usecase";
import { createDestinatarioBodySchema } from '../../../application/dtos/create-destinatario.dto';

export class CreateDestinatarioController extends BaseController {
    constructor(private createDestinatarioUseCase: CreateDestinatarioUseCase) { super() }

    public docs: RouteDocsConfig = {
        summary: 'Cria um novo destinatário',
        tags: ['Destinatários'],
        body: createDestinatarioBodySchema,
        response: {
            [HttpStatusCode.CREATED]: {
                description: 'Destinatário criado com sucesso!',
                schema: z.object({ destinatarioId: z.uuid() })
            }
        }
    };

    handle = async (req: Request, res: Response) => {
        try {
            const { nome, cpf, telefone, email, senha } = createDestinatarioBodySchema.parse(req.body);

            const cleanedCpf = cpf.replace(/[^\d]+/g, '');

            const { destinatarioId } = await this.createDestinatarioUseCase.execute({ nome, cpf: cleanedCpf, telefone, email, senha });

            return this.created(res, "Destinatário criado com sucesso!", { destinatarioId });
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}