import { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpenseList";
import { TypeExpense } from "~/types/Types";
import { requiredUserSession } from "~/utils/auth.server";
import { getExpenses } from "~/utils/expenses.server";

interface TypeExpenseProps {
  expenses: TypeExpense[]
}

export default function ExpensiveLayout() {
  const { expenses } = useLoaderData<TypeExpenseProps>();
  const hasExpenses = expenses && expenses.length > 0;
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
      {hasExpenses && <ExpensesList expenses={expenses} />}
      {!hasExpenses && <section id="no-expenses">
        <h1>No expenses found</h1>
        <p>Start <Link to="add">Adding some</Link> today</p>
      </section>}
    </main>
  </>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requiredUserSession(request)
  const expenses = await getExpenses(userId)
  // if (!expenses || expenses.length === 0) {
  //   throw json({ message: 'Could not find any expenses' }, { status: 404, statusText: 'No expenses found! ' })
  // }
  return { expenses }
}

