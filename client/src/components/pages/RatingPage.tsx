import React, { useEffect } from 'react';
import { Box } from '@mui/material';
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
    <Box>
      <SoloRating soloRating={soloRating} />
      <br />
      <RatingTable rating={rating} />
    </Box>
  );
}
