import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { UserType } from '../../../types/userTypes';

type RatingItemProps = {
  soloRating: UserType;
};

export default function SoloRating({ soloRating }: RatingItemProps): JSX.Element {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: '#000080', // Темно-синий фон
        border: '2px solid #FFD700',
        borderRadius: 0, // Золотая рамка
        boxShadow: 3,
        color: '#FFD700', // Золотой текст
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="rating table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Имя</TableCell>
            <TableCell align="right" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
              Очки
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {soloRating.map((el) => (
            <TableRow key={el.id}>
              <TableCell
                component="th"
                scope="row"
                sx={{ color: '#FFD700', fontWeight: 'bold', borderBottom: '1px solid #FFD700' }}
              >
                {el.name}
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: '#FFD700', fontWeight: 'bold', borderBottom: '1px solid #FFD700' }}
              >
                {el.totalScore}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
