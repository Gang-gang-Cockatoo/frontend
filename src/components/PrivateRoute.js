import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ role }) {
  const user = { role: 'recruiter' };

  if (user.role !== role) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
