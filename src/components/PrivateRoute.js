import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ type }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user?.type) return <Navigate to="/" />;

  if (type === 'shared') return <Outlet />;

  if (user.type !== type) return <Navigate to="/" />;

  return <Outlet />;
}
