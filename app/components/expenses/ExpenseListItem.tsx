import { Form, Link } from "@remix-run/react";
import { TypeExpense } from "../../types/Types";


const ExpenseListItem: React.FC<TypeExpense> = ({ id, title, amount }) => {
  function deleteExpenseItemHandler() {
    // tbd
  }

  const amountValue = amount as unknown as number;

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amountValue.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/* <button onClick={deleteExpenseItemHandler}>Delete</button> */}
        <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;