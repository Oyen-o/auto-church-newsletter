import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import SermonPage from './app/app';
import HomePage from './app/Components/Routes/home';
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
        element: <HomePage/>,
      },
      {
        path: 'newsletter/:videoId',
        element: <SermonPage/>,
      },
    ]
  }
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
