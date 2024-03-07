import { LinksFunction, LoaderFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import MainHeader from '~/components/navigation/MainHeader'
import marketingStyles from '~/css/marketing.css'

export default function MarketingLayout() {
  return <>
    <MainHeader />
    <Outlet />
  </>
}

export const loader: LoaderFunction = () =>{
  
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: marketingStyles }]
}