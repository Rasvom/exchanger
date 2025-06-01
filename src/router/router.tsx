import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '@pages/home';
import AuthGuard from '@components/AuthGuard';
import Authorization from '@pages/authorization';
import Layout from '@components/Layout';
import PageTitle from '@components/PageTitle';
import Registration from '@pages/registration';
import Profile from '@pages/profile';
import OrderHistory from '@pages/order-history';
import WalletVerification from '@pages/wallet-verification';
import ProtectedRoute from '@components/ProtectedRoute';
import { Container } from '@chakra-ui/react';
import AmlKycPolicy from '@pages/aml-kyc-policy';
import RulesAgreement from '@pages/rules-agreement';
import RequestView from '@pages/request/view';

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
        path: '/profile',
        element: (
          <ProtectedRoute>
            <PageTitle title='Профиль'>
              <Profile />
            </PageTitle>
          </ProtectedRoute>
        ),
      },
      {
        path: '/order-history',
        element: (
          <ProtectedRoute>
            <PageTitle title='История заявок'>
              <OrderHistory />
            </PageTitle>
          </ProtectedRoute>
        ),
      },
      {
        path: '/wallet-verification',
        element: (
          <ProtectedRoute>
            <PageTitle title='Верификация счетов'>
              <WalletVerification />
            </PageTitle>
          </ProtectedRoute>
        ),
      },
      {
        path: '/requests/:id',
        element: <RequestView />,
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
