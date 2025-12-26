import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../../../core/errors/app-error';
import { ValidationError } from '../../../core/errors/validation.error';
import { pinoLogger } from '../../loggers/pino.logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction
) => {
    if (res.headersSent)
        return next(err);

    if (err instanceof AppError) {
        const response = {
            ...err.toJSON(),
            instance: req.originalUrl
        };

        res.setHeader('Content-Type', 'application/problem+json');
        return res.status(err.status).json(response);
    }

    if (err instanceof ZodError) {
        const fieldErrors = err.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
        }));

        const validationError = new ValidationError(fieldErrors);

        res.setHeader('Content-Type', 'application/problem+json');
        return res.status(validationError.status).json({
            ...validationError.toJSON(),
            instance: req.originalUrl
        });
    }

    pinoLogger.error({
        err,
        method: req.method,
        path: req.originalUrl
    }, '❌ Unhandled Internal Server Error');

    const internalError = {
        type: 'about:blank',
        title: 'Internal Server Error',
        status: 500,
        detail: 'An unexpected error occurred. Please try again later.',
        instance: req.originalUrl,
        ...(process.env.NODE_ENV === 'development' && {
            stack: err instanceof Error ? err.stack : undefined
        })
    };

    res.setHeader('Content-Type', 'application/problem+json');
    return res.status(500).json(internalError);
}