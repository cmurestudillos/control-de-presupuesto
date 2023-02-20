import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <main>
          <div>
              <Outlet />
          </div>
      </main>
    </>
  )
}
export default AuthLayout;