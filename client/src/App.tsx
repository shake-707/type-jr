import Login from './pages/Login';
import Register from './pages/Register';

import Home from './pages/Home';
import Account from './pages/Account';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/account',
      element: <Account />,
    },
  ]);

  return (
    <div className="bg-navy-blue font-jura font-medium min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
