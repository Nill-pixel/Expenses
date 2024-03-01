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

const Document: React.FC<DocumentProps> = ({ title, children }) => {
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
      s
    </Document>
  );
}


export function ErrorBoundary() {
  const error = useRouteError();

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

  let errorMessage = "Unknown error";

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}
