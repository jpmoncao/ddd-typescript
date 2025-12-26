import { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export function setupSecurity(app: Express) {
    // Helmet (CSP e Headers)
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
                imgSrc: ["'self'", "data:", "https://cdn.jsdelivr.net"],
                connectSrc: ["'self'"]
            },
        },
    }));

    // CORS
    app.use(cors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }));

    // Rate Limit
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Muitas requisições deste IP, tente novamente mais tarde.',
        standardHeaders: true,
        legacyHeaders: false,
    }));
}