import { ActionFunction, LinksFunction, redirect } from '@remix-run/node'
import AuthForm from '~/components/auth/AuthForm'
import authStyle from '~/css/auth.css'
import { TypeUser } from '~/types/Types'
import { login, signup } from '~/utils/auth.server'
import { validateCredentials } from '~/utils/validation.server'
import { CustomError } from '~/utils/CustomError'

export default function AuthPage() {
  return <AuthForm />
}

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const credentials: TypeUser = Object.fromEntries(formData) as unknown as TypeUser

  try {
    validateCredentials(credentials)
  } catch (error) {
    return error
  }

  try {
    if (authMode === 'login') {
      return await login(credentials)
    } else {
      return await signup(credentials)
    }
  } catch (error) {
    if (error instanceof CustomError && error.status === 422) {
      return { message: error.message }
    }else if(error instanceof CustomError && error.status === 401){
      return { message: error.message }
    }
  }

}
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: authStyle }]
}