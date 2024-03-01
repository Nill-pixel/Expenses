import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";
import { TypeExpense } from "../../types/Types";


const ExpenseListItem: React.FC<TypeExpense> = ({ id, title, amount }) => {
  // const submit = useSubmit();
  const fetcher = useFetcher()
  function deleteExpenseItemHandler() {
    // submit(null, {
    //   method: 'delete',
    //   action: `/expenses/${id}`
    // })
    const proceed = confirm('Are you sure? Do you want to delete this item?')

    if (!proceed) {
      return
    }

    fetcher.submit(null, {
      method: 'delete',
      action: `/expenses/${id}`
    })
  }

  if (fetcher.state !== 'idle') {
    return <article className="expense-item locked">
      <p>Deleting....</p>
    </article>
  }

  const amountValue = amount as unknown as number;

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amountValue.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;