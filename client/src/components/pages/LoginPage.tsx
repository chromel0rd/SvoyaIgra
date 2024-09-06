import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { loginThunk } from '../../redux/slices/auth/authThunks';
import type { UserLoginType } from '../../types/userTypes';

export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Box
      mt={5}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserLoginType;
        void dispatch(loginThunk(formData));
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <TextField
        fullWidth
        name="email"
        type="email"
        label="Email"
        variant="outlined"
        sx={{ marginBottom: 3 }}
      />
      <TextField
        fullWidth
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        sx={{ marginBottom: 3 }}
      />
      <Button variant="outlined" type="submit">
        Login
      </Button>
    </Box>
  );
}
