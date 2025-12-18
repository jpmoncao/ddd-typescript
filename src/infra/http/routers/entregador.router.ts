import { Router } from "express";

import { createEntregadorFactory } from "../../factories/create-entregador.factory"
import { autenticarEntregadorFactory } from "../../factories/autenticar-entregador.factory";

const entregadoresRouter = Router();

const createEntregadorController = createEntregadorFactory();
const autenticarEntregadorController = autenticarEntregadorFactory();

entregadoresRouter.post("/", createEntregadorController.handle);
entregadoresRouter.post("/login", autenticarEntregadorController.handle);

export { entregadoresRouter };
