import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpensiveStatic";
import { DUMMY_EXPENSES } from "~/datas/datas";


export default function ExpensesAnalysisPage() {
  return <main>
    <Chart expenses={DUMMY_EXPENSES} />
    <ExpenseStatistics expenses={DUMMY_EXPENSES} />
  </main>
}