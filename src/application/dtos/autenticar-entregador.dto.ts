import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const autenticarEntregadorBodySchema = z.object({
    email: z
        .email({ message: "Email inválido" })
        .openapi({
            description: 'Email cadastrado do entregador'
        }),
    senha: z
        .string({ message: "Senha inválida" })
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" })
        .openapi({
            description: 'Senha cadastrada do entregador'
        }),
});