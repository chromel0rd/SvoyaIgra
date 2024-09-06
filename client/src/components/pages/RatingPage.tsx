import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import getRatingThunk from '../../redux/slices/rating/ratingThunks';
import SoloRating from '../ui/RatingPage/SoloRating';
import RatingTable from '../ui/RatingPage/RatingTable';
import type { UserType } from '../../types/userTypes';

type UserItemProps = {
  user: UserType;
};

export default function RatingPage({ user }: UserItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const rating = useAppSelector((store) => store.rating);

  const soloRating = rating.filter((el) => el.id === user.id);
  console.log(soloRating);

  useEffect(() => {
    void dispatch(getRatingThunk());
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#000080', // Темно-синий фон
        padding: '20px',
        border: '2px solid #FFD700', // Золотая рамка
        borderRadius: '0', // Закругленные углы блока рейтинга
        boxShadow: 3,
        mt:'100px',
        mb:  '100px',
        color: '#FFD700', // Золотой текст
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        Ваш рейтинг
      </Typography>

      {/* SoloRating отображает персональный рейтинг */}
      <SoloRating soloRating={soloRating} />

      <Box sx={{ marginTop: '30px' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
          Общий рейтинг
        </Typography>

        {/* RatingTable отображает общую таблицу рейтингов */}
        <RatingTable rating={rating} />
      </Box>
    </Box>
  );
}
