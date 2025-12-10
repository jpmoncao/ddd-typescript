import { DomainRuleError } from "../../core/errors/domain-rule.error";
import { UniqueEntityID } from '../../core/entities/unique-entity-id.entity';
import { AggregateRoot } from "../../core/entities/aggregate-root";

import { Movimentacao } from "./movimentacao.entity";

import { StatusEntrega } from "../types/entrega";
import { EntregaDespachadaEvent } from "../events/entrega-despachada.event";

interface EntregaProps {
    status: StatusEntrega,
    movimentacoes?: Movimentacao[]
}

export class Entrega extends AggregateRoot {
    private _id: UniqueEntityID;
    private _status: StatusEntrega;
    private _movimentacoes: Movimentacao[];

    constructor(props: EntregaProps, id?: string) {
        super();
        this._id = new UniqueEntityID(id);
        this._status = props.status || StatusEntrega.PENDENTE;
        this._movimentacoes = props.movimentacoes || [];
    }

    get id() { return this._id.toString() };
    get status() { return this._status };
    get movimentacoes() { return this._movimentacoes };

    public criarMovimentacao(descricao: string) {
        const movimentacao = new Movimentacao(descricao)
        this.movimentacoes.push(movimentacao);
    }

    public despachar() {
        if (this._status != StatusEntrega.PENDENTE)
            throw new DomainRuleError('Apenas entregas com status "PENDENTE" podem ser despachadas.');

        this._status = StatusEntrega.CAMINHO;
        this.criarMovimentacao('O pedido saiu para entrega!');

        this.addEvent(new EntregaDespachadaEvent(this));
    }
}