import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const listaHistoricoEntregaParamsSchema = z.object({
    id: z
        .uuid({ message: 'Id da entrega não informado!' })
        .openapi({
            description: 'Id da entrega para obter histórico'
        })
});