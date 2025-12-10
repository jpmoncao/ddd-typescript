import { EntregaDespachadaEvent } from "../../domain/events/entrega-despachada.event";

export async function enviarEmailDespachoHandler(event: EntregaDespachadaEvent) {
    console.log(`[📧EMAIL] Enviando para ${event.payload.emailCliente}: Seu pedido ${event.payload.entregaId} está a caminho!`);
}