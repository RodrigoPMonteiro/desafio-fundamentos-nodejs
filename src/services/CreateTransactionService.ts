import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

/*
  * Conceito de Service:
    - Abstrair Regras de Negocio das Rotas!
    - Tornar o código mais reutilizável
    - Deixar as rotas reponsáveis somente por:
      * Receber requisições
      * Repassar os dados a outro arquivo
      * Devolver uma resposta
    - Tem que ter um nome auto-descritivo : CreateTransactionService
    - Possuir apenas 1 método execute();
    - Várias rotas ou arquivos podem usar o mesmo serviço!!!
*/

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    // TODO
    if (type === 'outcome') {
      const balancePreview =
        this.transactionsRepository.getBalance().total - value;

      if (balancePreview < 0) {
        throw Error(
          'Não é possível realizar a transação. O saldo atual é menor que o valor solicitado para resgate. ',
        );
      }
    }
    // FALTA CRIAR LÓGICA PARA execucao da getbalance

    // serviço executa o chamado do "create" da transaction no array de transactions
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
    // const  transaction = this.title;
  }
}

/*
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5)); --> 5 representa o valor que quer adicionar à soma
// expected output: 15
*/

export default CreateTransactionService;
