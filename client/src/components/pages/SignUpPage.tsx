import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { signUpThunk } from '../../redux/slices/auth/authThunks';
import type { UserSignUpType } from '../../types/userTypes';

export default function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="85vh" // Центрируем элемент по вертикали и горизонтали
    >
      <Box
        width="400px"
        height="500px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.currentTarget)) as UserSignUpType;
          void dispatch(signUpThunk(formData));
        }}
        sx={{
          backgroundColor: '#000080', // Темно-синий фон для формы
          border: '2px solid #FFD700', // Золотая рамка
          padding: '20px',
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '30px' }}
        >
          Зарегистрироваться
        </Typography>
        <TextField
          fullWidth
          name="name"
          label="Имя"
          variant="outlined"
          InputLabelProps={{
            style: { color: '#FFD700' }, // Золотая надпись
          }}
          InputProps={{
            style: { color: '#FFD700' }, // Золотой текст
          }}
          sx={{
            marginBottom: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FFD700', // Золотая рамка для полей ввода
              },
              '&:hover fieldset': {
                borderColor: '#FFD700',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFD700',
              },
            },
          }}
        />
        <TextField
          fullWidth
          name="email"
          type="email"
          label="Почта"
          variant="outlined"
          InputLabelProps={{
            style: { color: '#FFD700' },
          }}
          InputProps={{
            style: { color: '#FFD700' },
          }}
          sx={{
            marginBottom: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FFD700',
              },
              '&:hover fieldset': {
                borderColor: '#FFD700',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFD700',
              },
            },
          }}
        />
        <TextField
          fullWidth
          name="password"
          type="password"
          label="Пароль"
          variant="outlined"
          InputLabelProps={{
            style: { color: '#FFD700' },
          }}
          InputProps={{
            style: { color: '#FFD700' },
          }}
          sx={{
            marginBottom: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#FFD700',
              },
              '&:hover fieldset': {
                borderColor: '#FFD700',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFD700',
              },
            },
          }}
        />
        <Button
          fullWidth // Кнопка станет такой же ширины, как инпуты
          variant="outlined"
          type="submit"
          sx={{
            color: '#FFD700',
            textDecoration: 'none',
            fontWeight: 'bold',
            border: '1px solid #FFD700',
            padding: '10px',
            borderRadius: 0, // Убираем скругления у кнопки
            '&:hover': {
              backgroundColor: '#FFD700',
              color: '#000080',
            }
          }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
}
