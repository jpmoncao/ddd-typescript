> Este repositório ainda está em desenvolvimento...

# Domain Driven Design

### Caso de uso:
- Para estudar DDD na prática, além do design, da arquitetura e código limpo, selecionei um caso de uso de um **setor de logística**.
- Aqui estão alguns pontos do que essa API pode fazer:
1. **Entregas**
    - Criação de entregas
    - Manipulação do fluxo de entrega: `despacho` > `em caminho` > `conclusão da entrega`
    - Rastreamento com geolocalização da entrega
    - Controle de histórico e movimentações da entrega
2. **Entregador** - `[making]`
    - Criação do entregador
    - Autenticação no sistema
    - Atribuição das entregas
    - Atualização da localização do entregador
    - Confirmação de entrega
  
### Stack utilizada:
- **Typescript**
- **Node 22.15.0**
- **API**: Express
- **Banco** de dados: MySQL
- **ORM**: Prisma
- **Testes**: Vitest

### NPM scripts
```bash

npm run dev # hot reload da api

npm run prisma:generate # inicia o schema do prisma

npm run prisma:migrate-dev # verifica alterações no schema 

npm run prisma:deploy # roda as migrations no banco

npm run prisma:reset # reseta o banco

npm run test # testes automatizados
```
