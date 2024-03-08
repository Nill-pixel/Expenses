import { ActionFunction, json } from "@remix-run/node";
import { destroyUserSession } from "~/utils/auth.server";

export const action: ActionFunction = ({ request }) => {
  if (request.method !== 'POST') {
    throw json({ message: 'Invalid request method' }, { status: 400 })
  }
  return destroyUserSession(request)
}