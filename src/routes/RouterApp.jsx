import Layout from '../components/Layout';
import CategoryPage from '../pages/CategoryPage';
import HomePage from '../pages/HomePage';
import ProductDetailPage from '../pages/ProductDetailPage'; 
import CustomizePage from '../pages/CustomizePage'; 
// Importa las nuevas páginas
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';
import ShippingAndReturns from '../pages/ShippingAndReturns';

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
        path: '/producto/:productId',
        element: <ProductDetailPage />,
      },
      {
        path: '/customizePage',
        element: <CustomizePage />,
      },
      // Nuevas rutas para las políticas
      {
        path: '/politicas-privacidad',
        element: <PrivacyPolicy />,
      },
      {
        path: '/terminos-condiciones',
        element: <TermsAndConditions />,
      },
      {
        path: '/envios-devoluciones',
        element: <ShippingAndReturns />,
      },
    ],
  },
];