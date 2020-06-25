import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

// const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO

    const transactions = transactionsRepository.all();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    // getBalance
    const { title, value, type } = request.body;
    const validatedValue = getBalance(id);
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
