import { Request, Response } from 'express';
import z, { ZodError } from 'zod';

import { CreateEntregaUseCase } from "../../../application/use-cases/create-entrega.usecase";

import HttpStatusCode from "../utils/status-code"
import { StatusEntrega } from '../../../domain/types/entrega';


const createEntregaBodySchema = z.object({
    status: z.enum(StatusEntrega, { message: "Status não conhecido!" })
});

export class CreateEntregaController {
    constructor(private createEntregaUseCase: CreateEntregaUseCase) { }

    handle = async (req: Request, res: Response) => {
        try {
            const { status } = createEntregaBodySchema.parse(req.body);

            const result = await this.createEntregaUseCase.execute({ status });

            return res.status(HttpStatusCode.CREATED).json(result);
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