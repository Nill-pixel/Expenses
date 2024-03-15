import { HeadersFunction, LinksFunction, LoaderFunction } from '@remix-run/node'
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

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserFromSession(request) as string
  return { userId }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: marketingStyles }]
}

export const headers: HeadersFunction = ({ actionHeaders, loaderHeaders, parentHeaders }) => ({
  "Cache-Control": "max-age=300, s-maxage=3600",
})