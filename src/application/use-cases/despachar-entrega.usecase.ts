import { BaseUseCase } from "../../core/base/usecase";
import { ResourceNotFoundError } from '../../core/errors/resource-not-found.error'

import { EntregaRepository } from "../../domain/repositories/entrega.repository";

interface DespacharEntregaRequest {
    entregaId: string;
}

export class DespacharEntregaUseCase extends BaseUseCase<DespacharEntregaRequest, void> {
    constructor(private entregaRepository: EntregaRepository) { super() }

    async execute(request: DespacharEntregaRequest): Promise<void> {
        const entrega = await this.entregaRepository.findById(request.entregaId);
        if (!entrega)
            throw new ResourceNotFoundError('Entrega');

        entrega.despachar();

        await this.entregaRepository.save(entrega);
    }
}