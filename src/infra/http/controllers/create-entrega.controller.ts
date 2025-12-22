import { Request, Response } from 'express';
import z from 'zod';

import { BaseController } from '../../../core/base/controller'
import { CreateEntregaUseCase } from "../../../application/use-cases/create-entrega.usecase";

const createEntregaBodySchema = z.object({
    latitude: z
        .number({ message: "Latitude deve ser um número válido" })
        .min(-90, { message: "Latitude deve ser um número entre -90 e 90" })
        .max(90, { message: "Latitude deve ser um número entre -90 e 90" }),
    longitude: z
        .number({ message: "Longitude deve ser um número válido" })
        .min(-180, { message: "Longitude deve ser um número entre -180 e 180" })
        .max(180, { message: "Longitude deve ser um número entre -180 e 180" }),
    destinatarioId: z.uuid({ message: "Id do destinatário deve ser um UUID válido" }),
});

export class CreateEntregaController extends BaseController {
    constructor(private createEntregaUseCase: CreateEntregaUseCase) { super() }

    handle = async (req: Request, res: Response) => {
        try {
            const { latitude, longitude, destinatarioId } = createEntregaBodySchema.parse(req.body);

            const { entregaId } = await this.createEntregaUseCase.execute({ latitude, longitude, destinatarioId });

            return this.created(res, "Entrega criada com sucesso!", { entregaId });
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}