import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const despacharLoteEntregasBodySchema = z.object({
    entregas: z
        .array(z.uuid({ message: 'Id da entrega não informado!' }))
        .openapi({ description: 'Array com os ids das entregas a serem despachadas para esse entregador' }),
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