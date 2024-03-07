import { Link, NavLink, useLoaderData } from '@remix-run/react';
import Logo from '../util/Logo';

interface UserIdProps {
  userId: string
}

function MainHeader() {
  const { userId } = useLoaderData<UserIdProps>()
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId &&
              <form>
                <button className='cta-alt'>Logout</button>
              </form>}
            {!userId && (<Link to="/auth" className="cta">
              Login
            </Link>)
            }

          </li>
        </ul>
      </nav>
    </header >
  );
}

export default MainHeader;