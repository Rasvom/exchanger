import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '@pages/home';
import AuthGuard from '@components/AuthGuard';
import Authorization from '@pages/authorization';
import Layout from '@components/Layout';
import PageTitle from '@components/PageTitle';
import Registration from '@pages/registration';
import { Container } from '@chakra-ui/react';

const routes = [
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { path: '*', element: <Container>Такая страница нет</Container> },
      {
        path: '/login',
        element: (
          <AuthGuard>
            <PageTitle title='Авторизация'>
              <Authorization />
            </PageTitle>
          </AuthGuard>
        ),
      },
      {
        path: '/registration',
        element: (
          <AuthGuard>
            <PageTitle title='Регистрация'>
              <Registration />
            </PageTitle>
          </AuthGuard>
        ),
      },
      {
        path: '/',
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
