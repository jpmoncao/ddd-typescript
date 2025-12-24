import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const atualizarLocalizacaoEntregaParamsSchema = z.object({
    id: z
        .uuid({ message: 'Id da entrega não informado!' })
        .openapi({
            description: 'Id da entrega para atualizar'
        }),
});

export const atualizarLocalizacaoEntregaBodySchema = z.object({
    latitude: z
        .number({ message: 'Latitude não informada!' })
        .openapi({
            description: 'Latitude atual da entrega'
        }),
    longitude: z
        .number({ message: 'Longitude não informada!' })
        .openapi({
            description: 'Longitude atual da entrega'
        }),
});
