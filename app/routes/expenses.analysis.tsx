import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpensiveStatic";
import { DUMMY_EXPENSES } from "~/datas/datas";
import expensesStyle from "~/css/expenses.css"
import { LinksFunction } from "@remix-run/node";
import ExpensesHeader from "~/components/navigation/ExpensiveHeader";

export default function ExpensesAnalysisPage() {
  return <>
    <ExpensesHeader />
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  </>
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: expensesStyle }]
}
