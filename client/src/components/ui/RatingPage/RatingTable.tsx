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
  rating: UserType[];
};

export default function RatingTable({ rating }: RatingItemProps): JSX.Element {
  console.log({ rating });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rating.map((el) => (
            <TableRow key={el.id}>
              <TableCell component="th" scope="row">
                {el.name}
              </TableCell>
              <TableCell align="right">{el.totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
