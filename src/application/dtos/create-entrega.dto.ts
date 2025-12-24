import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const createEntregaBodySchema = z.object({
    destinatarioId: z
        .uuid({ message: "Id do destinatário deve ser um UUID válido" })
        .openapi({
            description: 'Id do destinatário da entrega'
        }),
    latitude: z
        .number({ message: "Latitude deve ser um número válido" })
        .min(-90, { message: "Latitude deve ser um número entre -90 e 90" })
        .max(90, { message: "Latitude deve ser um número entre -90 e 90" })
        .openapi({
            description: 'Latitude do destino da entrega'
        }),
    longitude: z
        .number({ message: "Longitude deve ser um número válido" })
        .min(-180, { message: "Longitude deve ser um número entre -180 e 180" })
        .max(180, { message: "Longitude deve ser um número entre -180 e 180" })
        .openapi({
            description: 'Longitude do destino da entrega',
        }),
});