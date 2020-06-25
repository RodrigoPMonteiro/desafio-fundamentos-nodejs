import Transaction from '../models/Transaction';

/*
  * Conceito de Repositório:
    - Ponte entre a aplicação e o banco de dados
    - Isola a forma com que lidamos com dados
    - Métodos comuns para Listar, Criar, Editar e Apagar dados
*/

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  // ESSA FUNCAO TEM QUE SOMAR OS TOTAIS - A PARTE DE VALIDACAO É OUTRA
  public getBalance(): BalanceDTO {
    const balance: BalanceDTO = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;
      }
      if (transaction.type === 'outcome') {
        balance.outcome += transaction.value;
      }

      return balance;
    });

    balance.total = +balance.income - balance.outcome;

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
