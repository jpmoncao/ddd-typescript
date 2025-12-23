import { DomainEventHandler } from "../../core/events/handler";
import { EntregaConcluidaEvent } from "../../domain/events/entrega-concluida.event";
import { DestinatarioRepository } from "../../domain/repositories/destinatario.repository";
import { getEntregaConcluidaTemplate } from "../../infra/mail/templates/entrega-concluida.template";
import { MailBody, MailGateway, MailTo } from "../gateway/mail";

export class EnviarEmailEntregaConcluidaHandler implements DomainEventHandler {
    constructor(private destinatarioRepository: DestinatarioRepository, private mail: MailGateway) { }

    public handle = async (event: EntregaConcluidaEvent) => {
        const destinatario = await this.destinatarioRepository.findById(event.payload.destinatarioId);
        if (!destinatario) {
            console.log(`[❌EMAIL] Destinatário com ID ${event.payload.destinatarioId} não encontrado. Não foi possível enviar o email.`);
            return;
        }

        const to: MailTo[] = [{
            nome: destinatario.nome,
            email: destinatario.email
        }]

        const body: MailBody = {
            html: getEntregaConcluidaTemplate({
                idEntrega: event.payload.entregaId,
                nomeDestinatario: destinatario.nome,
            }),
            textContent: `Olá, ${destinatario.nome}! Sua entrega referente ao código: ${event.payload.entregaId} foi entregue com sucesso! Esperamos que você aproveite sua encomenda.`
        }

        await this.mail.sendMail(to, 'Entrega Concluída', body);
    }
}