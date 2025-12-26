import { Request, Response } from 'express';
import { ZodError } from 'zod';

import HttpStatusCode from '../../infra/http/utils/status-code';
import { RouteDocsConfig } from '../../infra/http/docs/describe-route';

import { AppError } from '../errors/app-error';
import { pinoLogger } from '../../infra/loggers/pino.logger';

export abstract class BaseController {
    abstract handle(req: Request, res: Response): Promise<Response | void>;
    abstract docs: RouteDocsConfig;

    protected analyzeError(res: Response, error: unknown) {
        throw error;
    }

    protected ok<T>(res: Response, message: string, dto?: T) {
        return res.status(HttpStatusCode.OK).json({
            message,
            data: dto ?? []
        });
    }

    protected created<T>(res: Response, message: string, dto?: T) {
        return res.status(HttpStatusCode.CREATED).json({
            message,
            data: dto ?? []
        });
    }

    protected clientError(res: Response, message?: string) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ message: message || 'Bad request' });
    }

    protected notFound(res: Response, message?: string) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: message || 'Not found' });
    }

    protected fail(res: Response, error: Error | string) {
        console.error(error);
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.toString() });
    }
}