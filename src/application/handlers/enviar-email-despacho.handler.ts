import { DomainEventHandler } from "../../core/events/handler";
import { EntregaDespachadaEvent } from "../../domain/events/entrega-despachada.event";
import { DestinatarioRepository } from "../../domain/repositories/destinatario.repository";
import { getEntregaDespachadaTemplate } from "../../infra/mail/templates/entrega-despachada.template";
import { MailBody, MailGateway, MailTo } from "../gateway/mail";

export class EnviarEmailDespachoHandler implements DomainEventHandler {
    constructor(private destinatarioRepository: DestinatarioRepository, private mail: MailGateway) { }

    public handle = async (event: EntregaDespachadaEvent) => {
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
            html: getEntregaDespachadaTemplate({
                idEntrega: event.payload.entregaId,
                nomeDestinatario: destinatario.nome,
            }),
            textContent: `Olá, ${destinatario.nome}! Sua entrega referente ao código: ${event.payload.entregaId} está a caminho!`
        }

        await this.mail.sendMail(to, 'Pedido saiu para entrega', body);
    }
}
