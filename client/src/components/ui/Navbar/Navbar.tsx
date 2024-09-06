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
      ? [
        { to: '/', name: 'Main' },
      ]
      : [
          { to: '/signup', name: 'Sign Up' },
          { to: '/login', name: 'Login' },
        ]),
  ];

  return (
    <Box sx={{ flexGrow: 1, typography: 'body1', mb: '30px' }}>
      <AppBar position="static" sx={{ background: '#000', boxShadow: 'none' }}>
        <Toolbar>
          <Box mr={3}>
            <Typography>Hello, {user.status === 'logged' ? user.name : 'guest'}</Typography>
          </Box>
          {links.map((link) => (
            <Link
              component={NavLink}
              key={link.name}
              to={link.to}
              sx={{ color: 'white', mr: 2, textDecoration: 'none' }}
            >
              {link.name}
            </Link>
          ))}
          {user.status === 'logged' && (
            <Button sx={{ color: 'white' }} onClick={() => void dispatch(logoutThunk())}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

