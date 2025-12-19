import { Request, Response } from 'express';
import z from 'zod';

import { BaseController } from '../../../core/base/controller'
import { ValidationError } from '../../../core/errors/validation.error';

import { ConcluirEntregaUseCase } from '../../../application/use-cases/concluir-entrega.usecase'

const concluirEntregaParamsSchema = z.object({
    id: z.uuid({ message: 'Id da entrega não informado!' })
});

export class ConcluirEntregaController extends BaseController {
    constructor(private concluirEntregaUseCase: ConcluirEntregaUseCase) { super() }

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = concluirEntregaParamsSchema.parse(req.params);

            const file = req.file;
            if (!file)
                throw new ValidationError('Comprovante (foto) é obrigatório para concluir a entrega.');

            await this.concluirEntregaUseCase.execute({
                entregaId: id,
                entregadorId: req.user.id,
                fileBody: file.buffer,
                fileType: file.mimetype
            });

            return this.ok(res, 'Pedido de entrega foi concluído.');
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}