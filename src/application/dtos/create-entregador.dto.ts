import z from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

import { validarCpf } from '../../core/utils/validar-cpf';

extendZodWithOpenApi(z);

export const createEntregadorBodySchema = z.object({
    nome: z
        .string({ message: "Nome é obrigatório" })
        .min(1, { message: "Nome é obrigatório" })
        .max(100, { message: "Nome muito longo" })
        .openapi({
            description: 'Nome completo do entregador',
            example: 'João da Silva'
        }),

    cpf: z
        .string({ message: "CPF é obrigatório" })
        .transform((val) => val.replace(/[^\d]+/g, ''))
        .refine((val) => val.length === 11, { message: "CPF deve ter 11 dígitos" })
        .refine((val) => validarCpf(val), { message: "CPF inválido." })
        .openapi({
            description: 'CPF válido (com ou sem pontuação)',
            examples: [
                '123.456.789-00',
                '12345678900',
            ]
        }),

    telefone: z
        .string({ message: "Telefone é obrigatório" })
        .transform((val) => val.replace(/[^\d]+/g, ''))
        .refine((val) => val.length >= 10 && val.length <= 11, { message: "Telefone inválido" })
        .openapi({
            description: 'Celular com DDD (somente números ou formatado)',
            examples: [
                '(11) 99999-8888',
                '11999998888'
            ]
        }),

    email: z
        .email({ message: "E-mail inválido" })
        .openapi({
            description: 'E-mail para login e notificações',
            example: 'joao.silva@email.com'
        }),

    senha: z
        .string({ message: "Senha é obrigatória" })
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
        .regex(/[A-Z]/, { message: "A senha deve conter ao menos uma letra maiúscula" })
        .regex(/[a-z]/, { message: "A senha deve conter ao menos uma letra minúscula" })
        .regex(/[0-9]/, { message: "A senha deve conter ao menos um número" })
        .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial")
        .openapi({
            description: 'Senha forte (Min. 6 chars, maiúscula, minúscula, número e especial)',
            example: 'SenhaForte@123' // Um exemplo que passa na Regex para facilitar o teste
        })
});