import { Request, Response } from 'express';
import z from 'zod';

import { BaseController } from '../../../core/base/controller'
import { DespacharLoteEntregasUseCase } from '../../../application/use-cases/despachar-lote-entregas.usecase';

const despacharLoteEntregasBodySchema = z.object({
    entregas: z.array(z.uuid({ message: 'Id da entrega não informado!' })),
    latitude: z.number({ message: 'Latitude não informada!' }),
    longitude: z.number({ message: 'Longitude não informada!' })
});

export class DespacharLoteEntregasController extends BaseController {
    constructor(private despacharLoteEntregasUseCase: DespacharLoteEntregasUseCase) { super() }

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