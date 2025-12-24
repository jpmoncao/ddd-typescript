import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const atualizarLocalizacaoEntregaBodySchema = z.object({
    latitude: z
        .number({ message: 'Latitude não informada!' })
        .openapi({
            description: 'Latitude atual do entregador'
        }),
    longitude: z
        .number({ message: 'Longitude não informada!' })
        .openapi({
            description: 'Longitude atual do entregador'
        }),
});