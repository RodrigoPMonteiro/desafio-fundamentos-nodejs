import { Router } from 'express';

import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

/*
  As rotas devem ser reponsáveis somente por:
  * Receber requisições
  * Repassar os dados a outro arquivo
  * Devolver uma resposta
*/

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all();
    // Atencao aqui. Tem que "juntar" o repositório e o "balance"
    const balanceReturned = transactionsRepository.getBalance();
    return response.json({ transactions, balanceReturned });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body;

    // instancia o serviço
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // crio variavel para armazenar os dados de entrada da criação (post)
    // utilizando o serviço "createTransaction"
    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

/*
POST:
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income"
}

*/

export default transactionRouter;
