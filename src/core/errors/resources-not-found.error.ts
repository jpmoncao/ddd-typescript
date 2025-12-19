import { AppError } from "./app-error";

/**
 * Recursos não encontrados (retorna 404 (Not Found))
 */
export class ResourcesNotFoundError extends AppError {
    constructor(resourceName: string = 'Recurso') {
        super(`${resourceName} não encontrados(as).`, 404, 'resources_not_found_error');
    }
}