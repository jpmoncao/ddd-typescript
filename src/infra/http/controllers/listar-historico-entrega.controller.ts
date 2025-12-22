import { Request, Response } from 'express';
import z from 'zod';

import { BaseController } from '../../../core/base/controller'

import { ListarHistoricoEntregaUseCase } from '../../../application/use-cases/listar-historico-entrega.usecase'

import { EntregaPresenter } from '../presenters/entrega.presenter';

const listaHistoricoEntregaParamsSchema = z.object({
    id: z.uuid({ message: 'Id da entrega não informado!' })
});

export class ListarHistoricoEntregaController extends BaseController {
    constructor(private listaHistoricoEntregaUseCase: ListarHistoricoEntregaUseCase) { super() }

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = listaHistoricoEntregaParamsSchema.parse(req.params);

            const { entrega } = await this.listaHistoricoEntregaUseCase.execute({ entregaId: id, destinatarioId: req.user.id });

            const entregasPresented = { entrega: EntregaPresenter.toHTTP(entrega) };

            return this.ok(res, 'Histórico da entrega listado com sucesso!', entregasPresented);
        } catch (error) {
            this.analyzeError(res, error)
        }
    }
}