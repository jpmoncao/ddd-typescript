import { DomainEvent } from '../../core/events/domain-event'

import { Entrega } from '../entities/entrega.entity'

export class EntregaDespachadaEvent implements DomainEvent {
    public readonly occurredAt: Date;
    public readonly eventName: string;
    public readonly payload: { entregaId: string; emailCliente?: string };

    public static eventName = 'EntregaDespachada';

    constructor(entrega: Entrega) {
        this.occurredAt = new Date();
        this.payload = {
            entregaId: entrega.id,
            emailCliente: 'cliente@exemplo.com'
        }
        
        this.eventName = EntregaDespachadaEvent.eventName;
    }
}