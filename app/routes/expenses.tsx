import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import expensesStyle from "~/css/expenses.css"

export default function ExpensiveLayout() {
  return <main>
    <p>Shared Element</p>
    <Outlet />
  </main>
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: expensesStyle }]
}