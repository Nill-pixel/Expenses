import { LinksFunction } from '@remix-run/node'
import AuthForm from '~/components/auth/AuthForm'
import authStyle from '~/css/auth.css'

export default function AuthPage() {
  return <AuthForm />
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: authStyle }]
}