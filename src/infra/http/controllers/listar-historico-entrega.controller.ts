import z from 'zod';
import { Request, Response } from 'express';

import { RouteDocsConfig } from '../docs/describe-route';
import HttpStatusCode from '../utils/status-code';

import { BaseController } from '../../../core/base/controller'

import { ListarHistoricoEntregaUseCase } from '../../../application/use-cases/listar-historico-entrega.usecase'
import { listaHistoricoEntregaParamsSchema } from '../../../application/dtos/listar-historico-entrega.dto';

import { EntregaPresenter } from '../presenters/entrega.presenter';
import { StatusEntrega } from '../../../domain/types/entrega';
import { UserRole } from '../../../core/types/user-role';

export class ListarHistoricoEntregaController extends BaseController {
    constructor(private listaHistoricoEntregaUseCase: ListarHistoricoEntregaUseCase) { super() }

    public docs: RouteDocsConfig = {
        summary: 'Obter histórico da entrega',
        tags: ['Entregas'],
        roles: [UserRole.DESTINATARIO],
        params: listaHistoricoEntregaParamsSchema,
        response: {
            [HttpStatusCode.OK]: {
                description: 'Histórico da entrega listado com sucesso!',
                schema: z.object({
                    id_entrega: z.uuid(),
                    status: z.enum(StatusEntrega).openapi({ example: StatusEntrega.CAMINHO }),
                    movimentacoes: z.array(
                        z.object({
                            data: z.date(),
                            descricao: z.string()
                        })
                    )
                })
            }
        }
    };

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