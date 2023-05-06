import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { Home, Register } from '../pages';
import PrivateRoute from '../components/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  // candidate routes
  {
    path: '/candidate',
    element: <PrivateRoute role="candidate" />,
    children: [
      {
        path: 'quizzes',
        element: <div>Hello user!</div>,
      },
    ],
  },
  // recruiter routes
  {
    path: '/recruiter',
    element: <PrivateRoute role="recruiter" />,
    children: [
      {
        path: 'quizzes',
        element: <div>Hello recruiter!</div>,
      },
    ],
  },
]);
