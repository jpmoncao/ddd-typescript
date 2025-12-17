import { ValidationError } from "../../core/errors/validation.error";

export interface MovimentacaoProps {
    descricao: string;
    data: Date;
}

export class Movimentacao {
    private props: MovimentacaoProps;

    constructor(descricao: string, data?: Date) {
        if (descricao.length < 5) {
            throw new ValidationError("A descrição da movimentação deve ter no mínimo 5 caracteres.");
        }

        this.props = {
            descricao,
            data: data ?? new Date()
        }
    }

    get descricao(): string { return this.props.descricao; }
    get data(): Date { return this.props.data; }
}