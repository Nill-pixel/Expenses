import { LoaderFunction } from "@remix-run/node";
import { requiredUserSession } from "~/utils/auth.server";
import { getExpenses } from "~/utils/expenses.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requiredUserSession(request)
  return await getExpenses(userId);
}