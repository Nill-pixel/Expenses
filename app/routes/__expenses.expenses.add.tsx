import { ActionFunction, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { TypeExpense } from "~/types/Types";
import { requiredUserSession } from "~/utils/auth.server";
import { addExpense } from "~/utils/expenses.server";
import { validateExpenseInput } from "~/utils/validation.server";

export default function AddExpensesPage() {
  const navigate = useNavigate()

  const closeHandler = () => {
    navigate("..")
  }
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  )
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requiredUserSession(request)
  const formData = await request.formData()
  const expensesData: TypeExpense = Object.fromEntries(formData) as unknown as TypeExpense

  try {
    validateExpenseInput(expensesData)
  } catch (error) {
    return error
  }


  addExpense(expensesData, userId)
  return redirect('/expenses')
}