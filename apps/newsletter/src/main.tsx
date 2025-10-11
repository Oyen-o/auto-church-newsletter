import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import Callendar from './app/Components/Callendar/callendar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Callendar/>,
  },
  {
  path: '/newsletter',
  element: <App/>,
  }

]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
