import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import sharedStyles from '~/css/shared.css'
import Error from "./components/util/Error";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: sharedStyles }];

interface DocumentProps {
  title: string,
  children: React.ReactNode
}

export const Document: React.FC<DocumentProps> = ({ title, children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body>
        {children}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document title="Expense Web">
      <title></title>
    </Document>
  );
}


export function ErrorBoundary() {
  const error = useRouteError() as Error;

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (<>
      <Document title={error.statusText}>
        <main>
          <Error title={error.statusText}>
            <p>
              {error.data?.message ||
                'Sommentig went wrong. Please try again later.'}
            </p>
            <p>Back to <Link to="/">safety</Link>.</p>
          </Error>

        </main>
      </Document>
    </>
    );
  }

  let errorMessage = "An error occurred";

  return (<>
    <Document title={errorMessage}>
      <main>
        <Error title={errorMessage}>
          <p>
            {error.message ||
              'Sommentig went wrong. Please try again later.'}
          </p>
          <p>Back to <Link to="/">safety</Link>.</p>
        </Error>

      </main>
    </Document>
  </>
  );
}
