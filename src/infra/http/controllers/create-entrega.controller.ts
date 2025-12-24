import z from 'zod';
import { Request, Response } from 'express';

import { RouteDocsConfig } from '../docs/describe-route';
import HttpStatusCode from '../utils/status-code';

import { BaseController } from '../../../core/base/controller'
import { CreateEntregaUseCase } from "../../../application/use-cases/create-entrega.usecase";
import { createEntregaBodySchema } from '../../../application/dtos/create-entrega.dto';

export class CreateEntregaController extends BaseController {
    constructor(private createEntregaUseCase: CreateEntregaUseCase) { super() }

    public docs: RouteDocsConfig = {
        summary: 'Cria uma nova entrega',
        tags: ['Entregas'],
        body: createEntregaBodySchema,
        response: {
            [HttpStatusCode.CREATED]: {
                description: 'Entrega criada com sucesso!',
                schema: z.object({ entregaId: z.uuid() })
            }
        }
    };

    handle = async (req: Request, res: Response) => {
        try {
            const { latitude, longitude, destinatarioId } = createEntregaBodySchema.parse(req.body);

            const { entregaId } = await this.createEntregaUseCase.execute({ latitude, longitude, destinatarioId });

            return this.created(res, 'Entrega criada com sucesso!', { entregaId });
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}