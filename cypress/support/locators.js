const locators = {
  // General
  MESSAGE: '.toast-message',
  MENU: {
    HOME: '[data-test=menu-home]',
    SETTINGS: '[data-test=menu-settings]',
    CONTAS: '[href="/contas"]',
    RESET: '[href="/reset"]',
    MOVIMENTACAO: '[data-test=menu-movimentacao]',
    EXTRATO: '[data-test=menu-extrato]',
    SANDWICH: 'button.navbar-toggler',
  },
  // Login Page
  LOGIN: {
    EMAIL: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '[type=submit]',
  },
  // Contas page
  CONTAS: {
    NOME: '[data-test=nome]',
    BTN_SALVAR: '.btn[alt=Salvar]',
    FN_XP_BTN_ALTERAR: (nomeConta) => `//table//td[contains(.,'${nomeConta}')]/..//i[@class='far fa-edit']`,
  },
  // Movimentacao page
  MOVIMENTACAO: {
    DESCRICAO: '[data-test=descricao]',
    VALOR: '[data-test=valor]',
    INTERESSADO: '[data-test=envolvido]',
    CONTA: '[data-test=conta]',
    STATUS: '[data-test=status]',
    BTN_SALVAR: '.btn[alt=Salvar]',
  },
  EXTRATO: {
    LINHAS: '.list-group > li',
    FN_XP_BUSCA_ELEMENTO: (desc, valor) => `//span[contains(.,'${desc}')]/following-sibling::small[contains(.,'${valor}')]`,
    FN_XP_BUSCA_ELEMENTO_PARA_DELETAR: (desc) => `//span[contains(.,'${desc}')]/../../..//i[contains(@title,'Deletar')]`,
    FN_XP_BUSCA_ELEMENTO_PARA_EDITAR: (desc) => `//span[contains(.,'${desc}')]/../../..//i[contains(@title,'Alterar')]`,
    FN_XP_BUSCA_LINHA: (desc) => `//span[contains(.,'${desc}')]/../../../..`,
  },
  SALDO: {
    FN_XP_SALDO_CONTA: (nomeConta) => `//td[contains(.,'${nomeConta}')]/../td[2]`,
  },
}

export default locators;
