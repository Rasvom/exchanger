import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '@pages/home';
import AuthGuard from '@components/AuthGuard';
import Authorization from '@pages/authorization';
import Layout from '@components/Layout';
import PageTitle from '@components/PageTitle';
import Registration from '@pages/registration';
import { Container } from '@chakra-ui/react';
import AmlKycPolicy from '@pages/aml-kyc-policy';
import RulesAgreement from '@pages/rules-agreement';

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
        path: '/aml-kyc-policy',
        element: <AmlKycPolicy />,
      },
      {
        path: '/rules-agreement',
        element: <RulesAgreement />,
      },
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
