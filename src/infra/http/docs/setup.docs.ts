import { Express } from 'express';
import { apiReference } from '@scalar/express-api-reference';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import { getOpenApiSpec } from '../docs/open-api-spec';
import { EmailQueue } from '../../jobs/queues/email.queue';

export function setupDashboards(app: Express, emailQueue: EmailQueue) {
    // Bull Board
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');
    createBullBoard({ queues: [new BullMQAdapter(emailQueue.queue)], serverAdapter });
    app.use('/admin/queues', serverAdapter.getRouter());

    // Scalar Docs
    app.use('/docs', apiReference({
        content: getOpenApiSpec(),
        theme: 'kepler',
        pageTitle: 'Logistics API Docs',
        defaultOpenAllTags: true,
        showDeveloperTools: "never"
    }));
}