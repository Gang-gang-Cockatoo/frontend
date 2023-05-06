import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ type }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user.type !== type) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
