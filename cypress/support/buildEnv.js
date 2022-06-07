const buildEnv = () => {
  // interceptando as requisições para o servidor e substituindo pelo mock
  cy.server()

  cy.route({
    method: 'POST',
    url: '/signin',
    response: {
      id: 1,
      nome: 'Fake user',
      token: 'fake token',
    }
  }).as('signin')

  cy.route({
    method: 'GET',
    url: '/saldo',
    response: [
      {
        "conta_id": 999,
        "conta": "Carteira",
        "saldo": "100.00"
      },
      {
        "conta_id": 999,
        "conta": "Banco",
        "saldo": "100000.00"
      },
    ],
  }).as('saldo')

  cy.route({
    method: 'GET',
    url: '/contas',
    response: [
      { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
      { "id": 2, "nome": "banco", "visivel": true, "usuario_id": 1 },
    ],
  })
    .as('contas')

  cy.route({
    method: 'GET',
    url: '/extrato/**',
    response: [
      {
        "conta": "Conta para movimentacoes",
        "id": 1144127,
        "descricao": "Movimentacao para exclusao",
        "envolvido": "AAA",
        "observacao": null,
        "tipo": "DESP",
        "data_transacao": "2022-06-07T03:00:00.000Z",
        "data_pagamento": "2022-06-07T03:00:00.000Z",
        "valor": "-1500.00",
        "status": true,
        "conta_id": 1227337,
        "usuario_id": 30622,
        "transferencia_id": null,
        "parcelamento_id": null
      },
      {
        "conta": "Conta com movimentacao",
        "id": 1144128,
        "descricao": "Movimentacao de conta",
        "envolvido": "BBB",
        "observacao": null,
        "tipo": "DESP",
        "data_transacao": "2022-06-07T03:00:00.000Z",
        "data_pagamento": "2022-06-07T03:00:00.000Z",
        "valor": "-1500.00",
        "status": true,
        "conta_id": 1227338,
        "usuario_id": 30622,
        "transferencia_id": null,
        "parcelamento_id": null
      },
      {
        "conta": "Conta para saldo",
        "id": 1144129,
        "descricao": "Movimentacao 1, calculo saldo",
        "envolvido": "CCC",
        "observacao": null,
        "tipo": "REC",
        "data_transacao": "2022-06-07T03:00:00.000Z",
        "data_pagamento": "2022-06-07T03:00:00.000Z",
        "valor": "3500.00",
        "status": false,
        "conta_id": 1227339,
        "usuario_id": 30622,
        "transferencia_id": null,
        "parcelamento_id": null
      },
      {
        "conta": "Conta para saldo",
        "id": 1144130,
        "descricao": "Movimentacao 2, calculo saldo",
        "envolvido": "DDD",
        "observacao": null,
        "tipo": "DESP",
        "data_transacao": "2022-06-07T03:00:00.000Z",
        "data_pagamento": "2022-06-07T03:00:00.000Z",
        "valor": "-1000.00",
        "status": true,
        "conta_id": 1227339,
        "usuario_id": 30622,
        "transferencia_id": null,
        "parcelamento_id": null
      },
      {
        "conta": "Conta para saldo",
        "id": 1144131,
        "descricao": "Movimentacao 3, calculo saldo",
        "envolvido": "EEE",
        "observacao": null,
        "tipo": "REC",
        "data_transacao": "2022-06-07T03:00:00.000Z",
        "data_pagamento": "2022-06-07T03:00:00.000Z",
        "valor": "1534.00",
        "status": true,
        "conta_id": 1227339,
        "usuario_id": 30622,
        "transferencia_id": null,
        "parcelamento_id": null
      },
      {
        "conta": "Conta para extrato",
        "id": 1144132,
        "descricao": "Movimentacao para extrato",
        "envolvido": "FFF",
        "observacao": null,
        "tipo": "DESP",
        "data_transacao": "2022-06-07T03:00:00.000Z",
        "data_pagamento": "2022-06-07T03:00:00.000Z",
        "valor": "-220.00",
        "status": true,
        "conta_id": 1227340,
        "usuario_id": 30622,
        "transferencia_id": null,
        "parcelamento_id": null
      }
    ],
  }).as('extrato')
}

export default buildEnv
