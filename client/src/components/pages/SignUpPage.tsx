import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { signUpThunk } from '../../redux/slices/auth/authThunks';
import type { UserSignUpType } from '../../types/userTypes';

export default function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Box
          mt={5}
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpType;
            void dispatch(signUpThunk(formData));
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <TextField
            fullWidth
            name="name"
            label="Name"
            variant="outlined"
            sx={{ marginBottom: 3 }}
          />
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
            Sign Up
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
}
