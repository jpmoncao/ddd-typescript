import { Request, Response } from 'express';
import z, { ZodError } from 'zod';

import HttpStatusCode from '../utils/status-code'

import { DespacharEntregaUseCase } from '../../../application/use-cases/despachar-entrega.usecase'

const despacharEntregaParamsSchema = z.object({
    entregaId: z.uuid({ message: 'Id da entrega não informado!' })
});

export class DespacharEntregaController {
    constructor(private despacharEntregaUseCase: DespacharEntregaUseCase) { }

    handle = async (req: Request, res: Response) => {
        try {
            const { entregaId } = despacharEntregaParamsSchema.parse(req.params);

            const result = await this.despacharEntregaUseCase.execute({ entregaId });

            return res.status(HttpStatusCode.OK).json(result);
        } catch (error) {
            let errorMessage = 'Unknown error';
            if (error instanceof ZodError)
                errorMessage = JSON.parse(error.message)[0].message;
            else if (error instanceof Error)
                errorMessage = error.message;

            return res.status(HttpStatusCode.BAD_REQUEST).json({
                error: errorMessage
            })
        }
    }
}