import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRouter from './components/hocs/PrivateRouter';
import Root from './components/ui/Root';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/auth/authThunks';
import SignUpPage from './components/pages/SignUpPage';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import GamePages from './components/pages/GamePages/GamePages'; // удалить перед пушем

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, []);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { // удалить перед пушем
          path: '/game',
          element: <GamePages />,
        },
        {
          element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/login" />,
          children: [
            {
              path: '/',
              element: <MainPage />,
            },
          ],
        },

        {
          element: <PrivateRouter isAllowed={user.status !== 'logged'} redirect="/" />,
          children: [
            {
              path: '/signup',
              element: <SignUpPage />,
            },
            {
              path: '/login',
              element: <LoginPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
