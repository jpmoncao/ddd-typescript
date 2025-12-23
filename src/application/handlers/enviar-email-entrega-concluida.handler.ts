import { DomainEventHandler } from "../../core/events/handler";
import { EntregaConcluidaEvent } from "../../domain/events/entrega-concluida.event";
import { DestinatarioRepository } from "../../domain/repositories/destinatario.repository";

export class EnviarEmailEntregaConcluidaHandler implements DomainEventHandler {
    constructor(private destinatarioRepository: DestinatarioRepository) { }

    public handle = async (event: EntregaConcluidaEvent) => {
        const destinatario = await this.destinatarioRepository.findById(event.payload.destinatarioId);
        if (!destinatario) {
            console.log(`[❌EMAIL] Destinatário com ID ${event.payload.destinatarioId} não encontrado. Não foi possível enviar o email.`);
            return;
        }

        console.log(`[📧EMAIL] Enviando para ${destinatario.email}: Seu pedido acabou de ser entregue! (Id: ${event.payload.entregaId})`);
    }
}