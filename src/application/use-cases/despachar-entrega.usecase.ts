import { BaseUseCase } from "../../core/base/usecase";
import { ResourceNotFoundError } from '../../core/errors/resource-not-found.error'
import { DomainEventDispatcher } from "../../core/events/dispatcher";

import { EntregaRepository } from "../../domain/repositories/entrega.repository";

interface DespacharEntregaRequest {
    entregaId: string;
    latitude: number;
    longitude: number;
}

export class DespacharEntregaUseCase extends BaseUseCase<DespacharEntregaRequest, void> {
    constructor(private entregaRepository: EntregaRepository, dispatcher: DomainEventDispatcher) {
        super(dispatcher);
    }

    async execute(request: DespacharEntregaRequest): Promise<void> {
        const entrega = await this.entregaRepository.findById(request.entregaId);
        if (!entrega)
            throw new ResourceNotFoundError('Entrega');

        entrega.despachar(request.latitude, request.longitude);

        await this.entregaRepository.save(entrega);

        const dispatchedEvents = await this.dispatchEvents(entrega.domainEvents);
        if (dispatchedEvents)
            entrega.clearEvents();
    }
}