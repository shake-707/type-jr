import Login from './pages/Login';
import Register from './pages/Register';

import Home from './pages/Home';
import Account from './pages/Account';

import type { ReactNode } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

// type ProtectRouteProps = {
//   children: ReactNode;
// };

function App() {
  // const ProtectedRoute = ({ children }: ProtectRouteProps) => {
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (!currentUser) {
  //     console.log('not currently logged');
  //     return <Navigate to="/login" />;
  //   }

  //   return <>{children}</>;
  // };

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
    <div className="bg-navy-blue font-jura font-medium h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
