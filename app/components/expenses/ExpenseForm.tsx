import { Form, Link, useActionData, useLoaderData, useMatches, useNavigation, useParams, useSubmit } from "@remix-run/react";
import { TypeExpense, ValidationError } from "~/types/Types";

interface TypeExpenseProps {
  expenses: TypeExpense[]
}


interface Match {
  id: string,
  data: TypeExpense
}


function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData<ValidationError>()
  // const { expenseData } = useLoaderData<TypeExpenseProps>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state !== 'idle';
  const params = useParams()
  const matches = useMatches()
  const expenses = matches.find(match => match.id === 'routes/__expenses.expenses')?.data as TypeExpenseProps
  const expenseData = expenses.expenses.find((expense) => expense.id === params.id)

  const defaultValues = expenseData
    ? {
      title: expenseData.title,
      amount: expenseData.amount,
      date: expenseData.date
    } : {
      title: '',
      amount: '',
      date: ''
    }
  // const submit = useSubmit()

  // const submitHandler: FormEventHandler = (event) => {
  //   event.preventDefault();
  //   submit(event.currentTarget as HTMLFormElement, {
  //     method: 'post'
  //   })
  // }

  return (
    <Form method={expenseData ? 'PATCH' : 'POST'} className="form" id="expense-form" //onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} defaultValue={defaultValues.title} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required defaultValue={defaultValues.date ? defaultValues.date.slice(0, 10) : ''} />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Expense'}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;