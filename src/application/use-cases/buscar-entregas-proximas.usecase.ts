import { BaseUseCase } from "../../core/base/usecase";
import { ResourceNotFoundError } from "../../core/errors/resource-not-found.error";

import { EntregaRepository } from "../../domain/repositories/entrega.repository";
import { EntregadorRepository } from "../../domain/repositories/entregador.repository";

import { Entrega } from "../../domain/entities/entrega.entity";

interface BuscarEntregasProximasRequest {
    entregadorId: string;
}

interface BuscarEntregasProximasResponse {
    entregas: Entrega[];
}

export class BuscarEntregasProximasUseCase extends BaseUseCase<BuscarEntregasProximasRequest, BuscarEntregasProximasResponse> {
    constructor(private entregadorRepository: EntregadorRepository, private entregaRepository: EntregaRepository) { super(); }

    async execute({ entregadorId }: BuscarEntregasProximasRequest): Promise<BuscarEntregasProximasResponse> {
        const entregador = await this.entregadorRepository.findById(entregadorId);
        if (!entregador)
            throw new ResourceNotFoundError('Entregador');

        const entregas = await this.entregaRepository.findAllByEntregadorId(entregadorId);
        return { entregas };
    }
}