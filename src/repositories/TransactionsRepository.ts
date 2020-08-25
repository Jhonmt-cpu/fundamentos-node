import Transaction from '../models/Transaction';

interface Balance {
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
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.all();
    const income = transactions.reduce(
      (accmulator, item: Transaction): number => {
        return item.type === 'income' ? accmulator + item.value : accmulator;
      },
      0,
    );

    const outcome = transactions.reduce(
      (accmulator, item: Transaction): number => {
        return item.type === 'outcome' ? accmulator + item.value : accmulator;
      },
      0,
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
