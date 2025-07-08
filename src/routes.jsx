import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductPage from './pages/dashboard/ProductPage';
import AuthLayout from './layouts/AuthLayout';
import SigninPage from './pages/auth/SigninPage';
import CartPage from './pages/dashboard/CartPage';
import { WishlistPage } from './pages/dashboard/WishlistPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/wishlist',
        element: <WishlistPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/signin',
        element: <SigninPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);

export default router;
