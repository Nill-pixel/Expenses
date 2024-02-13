import { LinksFunction } from '@remix-run/node'
import authStyle from '~/css/auth.css'

export default function AuthPage() {
  return <h1>Auth Page</h1>
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: authStyle }]
}