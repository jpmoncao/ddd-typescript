import z from "zod";
import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { UserRole } from "../../../core/types/user-role";

import { JwtDecrypter } from '../../cryptography/jwt-decrypter';

interface JwtTokenPayload extends JwtPayload {
    sub: string;
    role?: UserRole;
}

const JwtTokenParser = z.object({
    sub: z.string(),
    role: z.enum(UserRole).optional()
});

const verificarEntregadorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ message: 'Token de autenticação não fornecido.' });

    const token = authorization.split('Bearer ')[1];
    if (!token)
        return res.status(401).json({ message: 'Token de autenticação inválido.' });

    const decrypter = new JwtDecrypter();
    const payload = await decrypter.decrypt<JwtTokenPayload>(token);

    if (!payload)
        return res.status(401).json({ message: 'Token de autenticação inválido.' });

    const { sub, role } = JwtTokenParser.parse(payload);

    req.user = { id: sub, role };

    next();
}

export { verificarEntregadorMiddleware };
