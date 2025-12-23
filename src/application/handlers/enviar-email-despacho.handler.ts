import { DomainEventHandler } from "../../core/events/handler";
import { EntregaDespachadaEvent } from "../../domain/events/entrega-despachada.event";
import { DestinatarioRepository } from "../../domain/repositories/destinatario.repository";

export class EnviarEmailDespachoHandler implements DomainEventHandler {
    constructor(private destinatarioRepository: DestinatarioRepository) { }

    public handle = async (event: EntregaDespachadaEvent) => {
        const destinatario = await this.destinatarioRepository.findById(event.payload.destinatarioId);
        if (!destinatario) {
            console.log(`[❌EMAIL] Destinatário com ID ${event.payload.destinatarioId} não encontrado. Não foi possível enviar o email.`);
            return;
        }

        console.log(`[📧EMAIL] Enviando para ${destinatario.email}: Seu pedido saiu para entrega! (Id: ${event.payload.entregaId})`);
    }
}
