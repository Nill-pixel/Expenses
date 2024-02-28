import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { getExpense } from "~/utils/expenses.server";

export default function UpdateExpensesPage() {
  const navigate = useNavigate()

  const closeHandler = () => {
    navigate("..")
  }
  return <Modal onClose={closeHandler}>
    <ExpenseForm />
  </Modal>
}

export const loader: LoaderFunction = async ({ params }) => {
  const expenseId = params.id as string
  const expenseData = await getExpense(expenseId)
  return { expenseData }
}