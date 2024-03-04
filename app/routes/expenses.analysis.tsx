import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpensiveStatic";
import expensesStyle from "~/css/expenses.css"
import { LinksFunction, LoaderFunction, json } from "@remix-run/node";
import ExpensesHeader from "~/components/navigation/ExpensiveHeader";
import { TypeExpense } from "~/types/Types";
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { getExpenses } from "~/utils/expenses.server";
import Error from "~/components/util/Error";

interface TypeExpenseProps {
  expenses: TypeExpense[]
}

export default function ExpensesAnalysisPage() {
  const { expenses } = useLoaderData<TypeExpenseProps>();
  const hasExpenses = expenses && expenses.length > 0;
  return <>
    <ExpensesHeader />
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  </>
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: expensesStyle }]
}

export const loader: LoaderFunction = async () => {
  const expenses = await getExpenses();
  if (!expenses || expenses.length === 0) {
    throw json({ message: 'Could not load expenses for the requested analysis' }, { status: 404, statusText: 'No expenses found! ' })
  }
  return { expenses }
}

export function ErrorBoundary() {
  const error = useRouteError() as Error;

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (<>
      <ExpensesHeader />
      <main>
        <Error title={error.statusText}>
          <p>
            {error.data?.message ||
              'Sommentig went wrong. Please try again later.'}
          </p>
        </Error>
      </main>
    </>
    );
  }
}

