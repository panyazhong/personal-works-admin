import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';

import ApplyList from './containers/apply-list/index.tsx';

import './index.css';
import Login from './login/index.tsx';
import ThoughtList from './containers/thought-list/index.tsx';
import NewsList from './containers/news-list.tsx/index.tsx';
import PaintingList from './containers/painting-list/index.tsx';
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/apply-list',
        element: <ApplyList />,
      },
      {
        path: '/thought-list',
        element: <ThoughtList />,
      },
      {
        path: '/news-list',
        element: <NewsList />,
      },
      {
        path: '/painting-list',
        element: <PaintingList />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
