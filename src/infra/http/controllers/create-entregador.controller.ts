import z from 'zod';
import { Request, Response } from 'express';

import { RouteDocsConfig } from '../docs/describe-route';
import HttpStatusCode from '../utils/status-code';

import { BaseController } from '../../../core/base/controller'
import { CreateEntregadorUseCase } from "../../../application/use-cases/create-entregador.usecase";
import { createEntregadorBodySchema } from '../../../application/dtos/create-entregador.dto';

export class CreateEntregadorController extends BaseController {
    constructor(private createEntregadorUseCase: CreateEntregadorUseCase) { super() }

    public docs: RouteDocsConfig = {
        summary: 'Cria um novo entregador',
        tags: ['Entregadores'],
        body: createEntregadorBodySchema,
        response: {
            [HttpStatusCode.CREATED]: {
                description: 'Entregador criado com sucesso!',
                schema: z.object({ entregadorId: z.uuid() })
            }
        }
    };

    handle = async (req: Request, res: Response) => {
        try {
            const { nome, cpf, telefone, email, senha } = createEntregadorBodySchema.parse(req.body);

            const cleanedCpf = cpf.replace(/[^\d]+/g, '');

            const { entregadorId } = await this.createEntregadorUseCase.execute({ nome, cpf: cleanedCpf, telefone, email, senha });

            return this.created(res, "Entregador criado com sucesso!", { entregadorId });
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}