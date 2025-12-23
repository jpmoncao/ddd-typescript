import { Queue } from 'bullmq';
import { connection } from '../../database/redis/conn';
import { JobQueue } from '../../../application/gateways/job-queue.gateway';
import { EmailJobName } from '../job-names';

export class EmailQueue implements JobQueue<EmailJobName> {
    public queueName = 'email-queue';
    static queueName = 'email-queue';

    private bullQueue: Queue;

    constructor() {
        this.bullQueue = new Queue(EmailQueue.queueName, {
            connection: connection,
            defaultJobOptions: {
                removeOnComplete: true,
                attempts: 3,
                backoff: { type: 'exponential', delay: 1000 },
            }
        });
    }

    async add<T>(name: EmailJobName, data: T) {
        await this.bullQueue.add(name, data);
    }
}