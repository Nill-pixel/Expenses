import { LinksFunction, LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import MainHeader from '~/components/navigation/MainHeader'
import marketingStyles from '~/css/marketing.css'
import { getUserFromSession } from '~/utils/auth.server'

export default function MarketingLayout() {
  return <>
    <MainHeader />
    <Outlet />
  </>
}

export const loader: LoaderFunction = ({ request }) => {
  const userId = getUserFromSession(request)
  return { userId }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: marketingStyles }]
}