import { describe, it, expect } from "vitest";
import { Destinatario } from "./destinatario.entity";

describe("Destinatario Entity", () => {
    const destinatarioDataFake = {
        nome: 'João Silva',
        cpf: '123.456.789-00',
        telefone: '(11) 99988-7766',
        email: 'joao.silva@example.com',
        senha: 'Senha123!'
    };

    it("deve criar o destinatario com propriedades válidas", () => {
        const destinatario = new Destinatario(destinatarioDataFake);

        expect(destinatario.nome).toEqual('João Silva');
        expect(destinatario.cpf).toEqual('123.456.789-00');
        expect(destinatario.telefone).toEqual('(11) 99988-7766');
        expect(destinatario.email).toEqual('joao.silva@example.com');
        expect(destinatario.senha).toEqual('Senha123!');
    });
});