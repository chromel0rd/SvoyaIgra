import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import Loader from '../hocs/Loader';
import Navbar from './Navbar';

export default function Root(): JSX.Element {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <Navbar />
      <Container>
        <Loader isLoading={user.status === 'pending'}>
            <Outlet />
        </Loader>
      </Container>
    </>
  );
}
