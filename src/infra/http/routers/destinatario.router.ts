import { createRouteGroup } from "../../../core/base/router-group";

import { createDestinatarioFactory } from "../../factories/create-destinatario.factory"
import { autenticarDestinatarioFactory } from "../../factories/autenticar-destinatario.factory";

const group = createRouteGroup('/destinatarios');

const createDestinatarioController = createDestinatarioFactory();
const autenticarDestinatarioController = autenticarDestinatarioFactory();

group.route('post', "/", createDestinatarioController);
group.route('post', "/login", autenticarDestinatarioController);

const destinatariosRouter = group.router;
export { destinatariosRouter };
