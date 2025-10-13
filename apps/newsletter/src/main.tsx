import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import Home from './app/Components/Routes/home';
import Layout from './app/Components/Layout/layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <Home/>,
      },
      {
        path: 'newsletter',
        element: <App/>,
      },
    ]
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
