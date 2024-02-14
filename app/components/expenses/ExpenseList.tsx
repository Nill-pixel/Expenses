import { TypeExpense } from '../types/Types';
import ExpenseListItem from './ExpenseListItem';

interface ExpenseProps {
  expenses: TypeExpense[]
}

const ExpensesList: React.FC<ExpenseProps> = ({ expenses }) => {

  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount} date={''} />
        </li>
      ))}
    </ol>
  );
}

export default ExpensesList;