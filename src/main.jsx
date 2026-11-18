import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Aquí importaremos el CSS de Tailwind y tus bases
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/RouterApp';

// Static defaults in index.html exist for crawlers that skip JavaScript. Drop them
// before the first render so the per-route <Seo /> tags are the only ones left.
document.head.querySelectorAll('[data-seo-default]').forEach((el) => el.remove());

const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
