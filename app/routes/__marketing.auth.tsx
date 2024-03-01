import { ActionFunction, LinksFunction } from '@remix-run/node'
import AuthForm from '~/components/auth/AuthForm'
import authStyle from '~/css/auth.css'
import { TypeUser } from '~/types/Types'

export default function AuthPage() {
  return <AuthForm />
}

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const expensesData: TypeUser = Object.fromEntries(formData) as unknown as TypeUser

  if (authMode === 'login') {
    //login
  } else {
    //signup
  }
}
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: authStyle }]
}