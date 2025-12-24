import { z } from 'zod';
import { RouteParameter } from '@asteasolutions/zod-to-openapi/dist/openapi-registry';
import { registry } from './open-api-spec';
import { UserRole } from '../../../core/types/user-role';

type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface ResponseOptions {
    description: string;
    schema?: z.ZodType;
}

export interface RouteDocsConfig {
    contentType?: 'application/json' | 'multipart/form-data';
    summary: string;
    description?: string;
    bearerAuth?: boolean;
    roles?: UserRole[];
    tags?: string[];
    body?: z.ZodType;
    params?: RouteParameter;
    query?: RouteParameter;
    response?: Record<number, z.ZodType | ResponseOptions>;
}

export function describeRoute(method: Methods, path: string, config: RouteDocsConfig) {
    const contentType = config.contentType || 'application/json';

    let finalDescription = config.description || '';

    if (config.roles && config.roles.length > 0) {
        const rolesFormatted = config.roles.map(r => `\`${r}\``).join(', ');
        finalDescription += `\n\n🔒 **Permissões necessárias:** ${rolesFormatted}`;
    }

    registry.registerPath({
        method,
        path,
        description: finalDescription,
        summary: config.summary,
        tags: config.tags,
        security: (config.bearerAuth || config.roles) ? [{ bearerAuth: [] }] : undefined,
        request: {
            params: config.params,
            query: config.query,
            body: config.body ? {
                content: {
                    [contentType]: { schema: config.body }
                }
            } : undefined,
        },
        responses: {
            ...Object.entries(config.response || {}).reduce((acc, [status, value]) => {
                const isZod = value instanceof z.ZodType;
                const description = isZod ? 'Sucesso' : value.description;
                const schema = isZod ? value : value.schema;

                return {
                    ...acc,
                    [status]: {
                        description,
                        content: schema ? { 'application/json': { schema } } : undefined
                    }
                };
            }, {}),
            ...(config.roles ? {
                403: { description: 'Proibido: O usuário não tem a permissão necessária.' }
            } : {})
        }
    });
}