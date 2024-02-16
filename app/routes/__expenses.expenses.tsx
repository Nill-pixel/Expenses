import { Outlet } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpenseList";
import { DUMMY_EXPENSES } from "~/datas/datas";

export default function ExpensiveLayout() {
  return <>
    <Outlet />
    <main>
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </main>
  </>
}
