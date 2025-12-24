import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const concluirEntregaParamsSchema = z.object({
    id: z.uuid({ message: 'Id da entrega não informado!' })
});

export const concluirEntregaBodySchema = z.object({
    file: z.custom<any>()
        .openapi({
            type: 'string',
            format: 'binary',
            description: 'Imagem do comprovante de entrega (JPG/PNG)'
        })
})