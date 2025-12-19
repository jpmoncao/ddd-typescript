import { Request, Response } from "express";
import { BaseController } from "../../../core/base/controller";
import { BuscarEntregasProximasUseCase } from "../../../application/use-cases/buscar-entregas-proximas.usecase";
import { EntregasProximasPresenter } from "../presenters/entrega-proximas.presenter";

export class BuscarEntregasProximasController extends BaseController {
    constructor(private usecase: BuscarEntregasProximasUseCase) { super() }

    handle = async (req: Request, res: Response) => {
        try {
            const { entregas } = await this.usecase.execute({ entregadorId: req.user.id });

            const entregasPresented = { entregas: EntregasProximasPresenter.toHTTP(entregas) };

            return this.ok(res, 'Entregas próximas listadas com sucesso.', entregasPresented);
        } catch (error) {
            this.analyzeError(res, error);
        }
    }
}