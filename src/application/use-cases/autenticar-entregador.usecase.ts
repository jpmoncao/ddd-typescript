import { BaseUseCase } from "../../core/base/usecase";
import { UserRole } from "../../core/types/user-role";
import { InvalidCredentialsError } from "../../core/errors/invalid-credentials";

import { Encrypter } from "../cryptography/encrypter";
import { Comparer } from "../cryptography/comparer";

import { EntregadorRepository } from "../../domain/repositories/entregador.repository";


interface AutenticarEntregadorRequest {
    email: string;
    senha: string;
}
interface AutenticarEntregadorResponse {
    token: string;
}

export class AutenticarEntregadorUseCase extends BaseUseCase<AutenticarEntregadorRequest, AutenticarEntregadorResponse> {
    constructor(private entregadorRepository: EntregadorRepository, private encrypter: Encrypter, private comparer: Comparer) { super() }

    async execute(request: AutenticarEntregadorRequest): Promise<AutenticarEntregadorResponse> {
        const entregador = await this.entregadorRepository.findByEmail(request.email);
        if (!entregador)
            throw new InvalidCredentialsError();

        const senhaValida = await this.comparer.compare(request.senha, entregador.senha);
        if (!senhaValida)
            throw new InvalidCredentialsError();

        const token = await this.encrypter.encrypt({
            sub: entregador.id,
            role: UserRole.ENTREGADOR
        });

        return { token };
    }
}