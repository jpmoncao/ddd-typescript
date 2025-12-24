import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const despacharEntregaParamsSchema = z.object({
    id: z
        .uuid({ message: 'Id da entrega não informado!' })
        .openapi({
            description: 'ID da entrega a ser despachada'
        }),
});

export const despacharEntregaBodySchema = z.object({
    latitude: z
        .number({ message: 'Latitude não informada!' })
        .min(-90)
        .max(90)
        .openapi({
            description: 'Latitude atual do entregador'
        }),

    longitude: z
        .number({ message: 'Longitude não informada!' })
        .min(-180)
        .max(180)
        .openapi({
            description: 'Longitude atual do entregador'
        })
});
