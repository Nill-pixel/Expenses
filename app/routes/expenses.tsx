import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpenseList";
import expensesStyle from "~/css/expenses.css"
import { DUMMY_EXPENSES } from "~/datas/datas";

export default function ExpensiveLayout() {
  return <>
    <Outlet />
    <main>
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </main>
  </>

}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: expensesStyle }]
}