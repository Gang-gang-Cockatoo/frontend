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
import { CompanyForm, PrivateRoute } from '../components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <LogIn /> },
      {
        path: 'register',
        children: [
          { path: 'candidate', element: <RegisterCandidate /> },
          { path: 'recruiter', element: <RegisterRecruiter /> },
        ],
      },
      // candidate routes
      {
        path: '',
        element: <PrivateRoute type="candidate" />,
        children: [{ path: 'rooms', element: <div>Rooms page</div> }],
      },
      // recruiter routes
      {
        path: '',
        element: <PrivateRoute type="recruiter" />,
        children: [
          { path: 'quizzes', element: <Quizzes /> },
          { path: 'users', element: <UserList /> },
          { path: 'create-quiz', element: <CompanyForm /> },
        ],
      },
      // shared routes
      {
        path: '',
        element: <PrivateRoute type="shared" />,
        children: [{ path: 'quiz/:quizId/room/:roomId', element: <Quiz /> }],
      },
    ],
  },
]);
