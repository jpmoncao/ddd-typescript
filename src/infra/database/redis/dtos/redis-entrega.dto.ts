export interface RedisEntregaDTO {
    id: string;
    status: string;
    destinatarioId: string;
    entregadorId?: string;
    urlComprovanteEntrega?: string;
    latitude_destino: number;
    longitude_destino: number;
    latitude_atual?: number;
    longitude_atual?: number;
    movimentacoes: {
        descricao: string;
        data: string;
        latitude?: number;
        longitude?: number;
    }[];
}