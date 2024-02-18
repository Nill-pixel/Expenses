import { LinksFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import ExpensesHeader from "~/components/navigation/ExpensiveHeader"
import expensesStyle from "~/css/expenses.css"

export default function ExpensiveLayout() {
  return <>
    <ExpensesHeader />
    <Outlet />
  </>
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: expensesStyle }]
}