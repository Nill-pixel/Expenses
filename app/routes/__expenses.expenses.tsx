import { Link, Outlet } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";
import ExpensesList from "~/components/expenses/ExpenseList";
import { DUMMY_EXPENSES } from "~/datas/datas";

export default function ExpensiveLayout() {
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
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </main>
  </>
}
