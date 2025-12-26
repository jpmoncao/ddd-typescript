import dotenv from 'dotenv';
import { createApp } from './app';
import { EmailQueue } from './infra/jobs/queues/email.queue';
import { emailWorker } from './infra/jobs/workers/email.worker';
import { prisma } from './infra/database/prisma/client';
import { redisConn } from './infra/database/redis/conn';
import { pinoLogger as logger } from './infra/loggers/pino.logger';

dotenv.config({ quiet: true });

const PORT = process.env.API_PORT ?? '5000';

async function bootstrap() {
    // Instanciar queues
    const emailQueue = new EmailQueue();

    // Iniciar aplicação
    const app = createApp(emailQueue);

    // Iniciar Servidor HTTP
    const server = app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`📄 Docs: http://localhost:${PORT}/docs`);
        console.log(`📊 Queues: http://localhost:${PORT}/admin/queues`);
    });

    // Iniciar Workers
    const workerInstance = emailWorker('✅ Email Worker started');

    const shutdown = async (signal: string) => {
        console.log(`\n🛑 ${signal} received. Starting graceful shutdown...`);

        server.close(async () => {
            console.log('🛑 HTTP Server closed.');

            try {
                if (workerInstance) {
                    console.log('🛑 Stopping Workers...');
                    await workerInstance.close();
                }

                console.log('🛑 Closing Queues...');
                await emailQueue.queue.close();

                console.log('🛑 Disconnecting Database...');
                await prisma.$disconnect();

                console.log('🛑 Disconnecting Redis...');
                await redisConn.quit();

                console.log('✅ Shutdown success.');
                process.exit(0);
            } catch (err) {
                logger.error({ err }, '❌ Error during shutdown');
                process.exit(1);
            }
        });

        setTimeout(() => {
            logger.error('❌ Shutdown timeout. Force exit.');
            process.exit(1);
        }, 10000).unref();
    };

    // Listeners
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
}

// Tratamento de erros globais no boot
bootstrap().catch(err => {
    logger.fatal({ err }, '❌ Fatal Error during bootstrap');
    process.exit(1);
});