import { createBrowserRouter } from 'react-router-dom';
import Home from '@pages/home';
import ProtectedRoute from '@components/ProtectedRoute';
import AuthGuard from '@components/AuthGuard';

const routes = [
  {
    path: '/login',
    element: (
      <AuthGuard>
        <div></div>
      </AuthGuard>
    ),
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
