import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpenseList";
import { TypeExpense } from "~/types/Types";
import { getExpenses } from "~/utils/expenses.server";

interface TypeExpenseProps {
  expenses: TypeExpense[]
}

export default function ExpensiveLayout() {
  const { expenses } = useLoaderData<TypeExpenseProps>();
  return <>
    <Outlet />
    <main>
      <section id="expenses-actions">
        <Link to="add">
          <FaPlus />
          <span>Add Expenses</span>
        </Link>
        <a href="/expenses/raw">
          <FaDownload />
          <span>Load Raw Data</span>
        </a>
      </section>
      <ExpensesList expenses={expenses} />
    </main>
  </>
}

export const loader: LoaderFunction = async () => {
  const expenses = await getExpenses();
  return { expenses }
}
