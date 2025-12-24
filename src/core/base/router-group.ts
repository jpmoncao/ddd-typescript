import { Router, RequestHandler } from 'express';
import { describeRoute, RouteDocsConfig } from '../../infra/http/docs/describe-route';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface ControllerWithDocs {
    handle: RequestHandler;
    docs: RouteDocsConfig;
}

export function createRouteGroup(prefix: string) {
    const router = Router();

    const route = (
        method: Method,
        path: string,
        controller: ControllerWithDocs,
        ...middlewares: RequestHandler[]
    ) => {
        const cleanPath = path === '/' ? '' : path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');
        const fullDocPath = `${prefix}${cleanPath}`;

        describeRoute(method, fullDocPath, controller.docs);

        router[method](path, ...middlewares, controller.handle);
    };

    return {
        router,
        route
    };
}