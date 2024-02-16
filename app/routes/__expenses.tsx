import { LinksFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import expensesStyle from "~/css/expenses.css"

export default function ExpensiveLayout() {
  return <Outlet />
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: expensesStyle }]
}