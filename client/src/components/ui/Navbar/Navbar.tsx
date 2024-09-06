import { AppBar, Box, Button, Link, Typography } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logoutThunk } from '../../../redux/slices/auth/authThunks';

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const links = [
    ...(user.status === 'logged'
      ? [{ to: '/', name: 'Игра' }]
      : [
          { to: '/signup', name: 'Зарегистрироваться' },
          { to: '/login', name: 'Войти' },
        ]),
  ];

  return (
    <Box sx={{ flexGrow: 1, typography: 'body1', mb: '30px' }}>
      <AppBar position="static" sx={{ background: '#000080', boxShadow: 'none', border: '2px solid #FFD700' }}>
        <Toolbar>
          {/* Левая сторона: Своя игра */}
          <Typography sx={{ color: '#FFD700', fontWeight: 'bold', flexGrow: 1 }}>
            <h1>Своя игра</h1> 
          </Typography>
          
          {/* Правая сторона: Ссылки и кнопки навигации */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: '#FFD700', fontWeight: 'bold', mr: 3 }}>
              Добро пожаловать, {user.status === 'logged' ? user.name : 'guest'}
            </Typography>
            {links.map((link) => (
              <Link
                component={NavLink}
                key={link.name}
                to={link.to}
                sx={{
                  color: '#FFD700',
                  mr: 2,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  border: '1px solid #FFD700',
                  padding: '10px',
                  minWidth: '100px',
                  textAlign: 'center',
                  '&:hover': {
                    backgroundColor: '#FFD700',
                    color: '#000080',
                  },
                }}
              >
                {link.name}
              </Link>
            ))}
            {user.status === 'logged' && (
              <Button
                sx={{
                  color: '#FFD700',
                  border: '1px solid #FFD700',
                  borderRadius: 0,
                  fontWeight: 'bold',
                  padding: '10px',
                  minWidth: '100px',
                  '&:hover': {
                    backgroundColor: '#FFD700',
                    color: '#000080',
                  },
                }}
                onClick={() => void dispatch(logoutThunk())}
              >
                Выйти
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
