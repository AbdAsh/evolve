// Importing necessary modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';
import DefaultLayout from './layouts/default';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Creating a router using react-router-dom
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout body={<App />} />,
  }
]);

// Rendering the app using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// Measuring performance of the app
reportWebVitals();
