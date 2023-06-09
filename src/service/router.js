import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import {
  Home,
  LogIn,
  Quiz,
  Quizzes,
  RegisterCandidate,
  RegisterRecruiter,
  Rooms,
  UserList,
} from '../pages';
import { CreateQuiz, PrivateRoute } from '../components';

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
        children: [{ path: 'rooms', element: <Rooms /> }],
      },
      // recruiter routes
      {
        path: '',
        element: <PrivateRoute type="recruiter" />,
        children: [
          { path: 'quizzes', element: <Quizzes /> },
          { path: 'users', element: <UserList /> },
          { path: 'create-quiz', element: <CreateQuiz /> },
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
