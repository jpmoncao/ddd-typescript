import { Entrega } from "../../domain/entities/entrega.entity";
import { EntregaRepository } from "../../domain/repositories/entrega.repository";

interface DespacharEntregaRequest {
    entregaId: string;
}

interface DespacharEntregaResponse {
    message: string;
}

export class DespacharEntregaUseCase {
    constructor(private entregaRepository: EntregaRepository) { }

    async execute(request: DespacharEntregaRequest): Promise<DespacharEntregaResponse> {
        const entrega = await this.entregaRepository.findById(request.entregaId);
        if (!entrega)
            throw new Error('Entrega não encontrada!')

        entrega.despachar();

        this.entregaRepository.save(entrega);

        return { message: 'O pedido saiu para entrega!' };
    }
}