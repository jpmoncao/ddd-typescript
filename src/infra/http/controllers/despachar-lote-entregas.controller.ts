import z from 'zod';
import { Request, Response } from 'express';

import { RouteDocsConfig } from '../docs/describe-route';
import HttpStatusCode from '../utils/status-code';

import { BaseController } from '../../../core/base/controller'
import { DespacharLoteEntregasUseCase } from '../../../application/use-cases/despachar-lote-entregas.usecase';
import { despacharLoteEntregasBodySchema } from '../../../application/dtos/despachar-lote-entregas.dto';
import { UserRole } from '../../../core/types/user-role';

export class DespacharLoteEntregasController extends BaseController {
    constructor(private despacharLoteEntregasUseCase: DespacharLoteEntregasUseCase) { super() }

    public docs: RouteDocsConfig = {
        summary: 'Despachar lote de entregas',
        tags: ['Entregas'],
        roles: [UserRole.ENTREGADOR],
        body: despacharLoteEntregasBodySchema,
        response: {
            [HttpStatusCode.OK]: {
                description: 'O lote saiu para entrega.',
                schema: z.object()
            }
        }
    };

    handle = async (req: Request, res: Response) => {
        try {
            const { entregas, latitude, longitude } = despacharLoteEntregasBodySchema.parse(req.body);

            await this.despacharLoteEntregasUseCase.execute({ entregas, entregadorId: req.user.id, latitude, longitude });

            return this.ok(res, 'O lote saiu para entrega.');
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}