import { BaseUseCase } from "../../core/base/usecase";

import { Entrega } from "../../domain/entities/entrega.entity";
import { EntregaRepository } from "../../domain/repositories/entrega.repository";
import { StatusEntrega } from "../../domain/types/entrega";

interface CreateEntregaRequest {
    status?: StatusEntrega;
}

export class CreateEntregaUseCase extends BaseUseCase<CreateEntregaRequest, void> {
    constructor(private entregaRepository: EntregaRepository) { super() }

    async execute(request: CreateEntregaRequest): Promise<void> {
        const entrega = new Entrega({
            status: request.status || StatusEntrega.PENDENTE
        });

        await this.entregaRepository.create(entrega);
    }
}