import { Request, Response } from 'express';
import z from 'zod';

import { BaseController } from '../../../core/base/controller'
import { DespacharEntregaUseCase } from '../../../application/use-cases/despachar-entrega.usecase'


const despacharEntregaParamsSchema = z.object({
    entregaId: z.uuid({ message: 'Id da entrega não informado!' })
});

export class DespacharEntregaController extends BaseController {
    constructor(private despacharEntregaUseCase: DespacharEntregaUseCase) { super() }

    handle = async (req: Request, res: Response) => {
        try {
            const { entregaId } = despacharEntregaParamsSchema.parse(req.params);

            await this.despacharEntregaUseCase.execute({ entregaId });

            return this.ok(res, { message: 'Pedido saiu para entrega!' });
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}