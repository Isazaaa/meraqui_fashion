import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Aquí importaremos el CSS de Tailwind y tus bases
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes/RouterApp';

const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
