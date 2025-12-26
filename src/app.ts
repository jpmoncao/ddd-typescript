import express from "express";

// Queues
import { EmailQueue } from "./infra/jobs/queues/email.queue";

// Middlewares
import { loggerMiddleware } from './infra/http/middlewares/logger.middleware';

// Setups
import { setupSecurity } from "./infra/http/config/security.config";
import { setupDashboards } from "./infra/http/docs/setup.docs";

// Rotas
import { entregasRouter } from "./infra/http/routers/entrega.router";
import { entregadoresRouter } from "./infra/http/routers/entregador.router";
import { destinatariosRouter } from "./infra/http/routers/destinatario.router";
import { errorHandler } from "./infra/http/middlewares/error-handler.middleware";

export function createApp(emailQueue: EmailQueue) {
    const app = express();

    app.use(express.json());

    setupSecurity(app);
    setupDashboards(app, emailQueue);

    app.use(loggerMiddleware);

    // Rotas de negócio
    app.use('/entregas', entregasRouter);
    app.use('/entregadores', entregadoresRouter);
    app.use('/destinatarios', destinatariosRouter);

    app.use(errorHandler);

    return app;
}