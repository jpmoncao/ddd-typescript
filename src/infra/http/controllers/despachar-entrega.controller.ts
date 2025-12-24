import z from 'zod';
import { Request, Response } from 'express';

import { RouteDocsConfig } from '../docs/describe-route';
import HttpStatusCode from '../utils/status-code';

import { BaseController } from '../../../core/base/controller'
import { DespacharEntregaUseCase } from '../../../application/use-cases/despachar-entrega.usecase'
import { despacharEntregaBodySchema, despacharEntregaParamsSchema } from '../../../application/dtos/despachar-entrega.dto';
import { UserRole } from '../../../core/types/user-role';

export class DespacharEntregaController extends BaseController {
    constructor(private despacharEntregaUseCase: DespacharEntregaUseCase) { super() }

    public docs: RouteDocsConfig = {
        summary: 'Despachar uma entrega',
        tags: ['Entregas'],
        roles: [UserRole.ENTREGADOR],
        params: despacharEntregaParamsSchema,
        body: despacharEntregaBodySchema,
        response: {
            [HttpStatusCode.OK]: {
                description: 'Pedido saiu para entrega.',
                schema: z.object()
            }
        }
    };

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = despacharEntregaParamsSchema.parse(req.params);
            const { latitude, longitude } = despacharEntregaBodySchema.parse(req.body);

            await this.despacharEntregaUseCase.execute({ entregaId: id, entregadorId: req.user.id, latitude, longitude });

            return this.ok(res, 'Pedido saiu para entrega.');
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}