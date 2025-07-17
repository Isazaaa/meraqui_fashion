import Layout from '../components/Layout';
import CategoryPage from '../pages/CategoryPage';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage'; 

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/categoria/:categoryName',
        element: <CategoryPage />,
      },
      {
        // 2. Añade la nueva ruta para el detalle de producto
        path: '/producto/:productId', // La URL será, por ej: /producto/conjunto-joger
        element: <ProductDetailPage />,
      },
    ],
  },
];