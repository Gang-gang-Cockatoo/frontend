import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import {
  Home,
  LogIn,
  Quiz,
  Quizzes,
  RegisterCandidate,
  RegisterRecruiter,
  UserList,
} from '../pages';
import PrivateRoute from '../components/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <LogIn />,
      },
      {
        path: 'register',
        children: [
          {
            path: 'candidate',
            element: <RegisterCandidate />,
          },
          {
            path: 'recruiter',
            element: <RegisterRecruiter />,
          },
        ],
      },
      // candidate routes
      {
        path: 'candidate',
        element: <PrivateRoute type="candidate" />,
        children: [
          {
            path: 'quizzes',
            element: <Quizzes />,
          },
          {
            path: 'quiz/:id',
            element: <Quiz />,
          },
        ],
      },
      // recruiter routes
      {
        path: 'recruiter',
        element: <PrivateRoute type="recruiter" />,
        children: [
          {
            path: 'quizzes',
            element: <Quizzes />,
          },
          {
            path: 'users',
            element: <UserList />,
          },
        ],
      },
    ],
  },
]);
