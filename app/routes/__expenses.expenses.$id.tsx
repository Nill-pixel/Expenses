import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { TypeExpense } from "~/types/Types";
import { deleteExpense, updateExpense } from "~/utils/expenses.server";
import { validateExpenseInput } from "~/utils/validation.server";
// import { getExpense } from "~/utils/expenses.server";

export default function UpdateExpensesPage() {
  const navigate = useNavigate()

  const closeHandler = () => {
    navigate("..")
  }
  return <Modal onClose={closeHandler}>
    <ExpenseForm />
  </Modal>
}

// export const loader: LoaderFunction = async ({ params }) => {
//   const expenseId = params.id as string
//   const expenseData = await getExpense(expenseId)
//   return { expenseData }
// }


export const action: ActionFunction = async ({ params, request }) => {
  const expenseId = params.id as string


  if (request.method === 'PATCH') {
    const formData = await request.formData()
    const expensesData: TypeExpense = Object.fromEntries(formData) as unknown as TypeExpense

    try {
      validateExpenseInput(expensesData)
    } catch (error) {
      return error
    }

    await updateExpense(expenseId, expensesData)
    return redirect('/expenses')
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId)
    return redirect('/expenses')
  }


}