import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  TextField,
  Box,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import getQuestionThunk from '../../../redux/slices/quistion/questionThunk';

export default function GamePages(): JSX.Element {
  const question = useAppSelector((store) => store.question);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({ answer: '' });
  const [correctAnswers, setCorrectAnswers] = useState(0); // For tracking correct answers
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof question)[number] | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]); // To store answered question IDs

  useEffect(() => {
    void dispatch(getQuestionThunk());
  }, []);

  const handleClickOpen = (item: (typeof question)[number]) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  // Automatically close dialog after 10 seconds and mark as answered
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (open) {
      timer = setTimeout(() => {
        handleClose();
        if (selectedItem) {
          setAnsweredQuestions([...answeredQuestions, selectedItem.id]); // Mark question as answered
        }
      }, 10000);
    }

    return () => {
      clearTimeout(timer); // Clear the timer when the dialog is closed or component unmounts
    };
  }, [open]);

  const groupedData = question.reduce(
    (acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = [];
      }
      acc[curr.category].push(curr);
      return acc;
    },
    {} as Record<string, typeof question>,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, answer: event.target.value });
  };

  // Check if the answer is correct
  const isCorrect = () => {
    if (selectedItem) {
      if (input.answer.toLowerCase() === selectedItem.answer.toLowerCase()) {
        setCorrectAnswers(correctAnswers + 1); // Increase score for correct answer
      }
      setAnsweredQuestions([...answeredQuestions, selectedItem.id]); // Mark question as answered
    }
    setInput({ answer: '' });
  };

  return (
    <div>
      <Box
        sx={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#FFD700',
          mb: '30px'
        }}
      >
        Правильные ответы: {correctAnswers}
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#191970',
          border: '2px solid #FFD700',
          borderRadius: '0',
        }}
      >
        <Table>
          <TableBody>
            {Object.entries(groupedData).map(([category, items]) => (
              <TableRow key={category}>
                <TableCell
                  sx={{
                    backgroundColor: '#000080',
                    color: '#FFD700',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '250px',
                    height: '100px',
                    border: '1px solid #FFD700',
                  }}
                >
                  <Typography variant="h5">{category}</Typography>
                </TableCell>

                {items
                  .filter((item) => !answeredQuestions.includes(item.id)) // Filter out answered questions
                  .map((item, index) => (
                    <TableCell key={index} sx={{ padding: 0, textAlign: 'center' }}>
                      <Card
                        sx={{
                          width: 150,
                          height: 100,
                          textAlign: 'center',
                          backgroundColor: '#000080',
                          color: '#FFD700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #FFD700',
                          borderRadius: '0',
                          ml: '10px',
                          '&:hover': {
                            backgroundColor: '#FFD700',
                            color: '#000080',
                          },
                        }}
                        onClick={() => handleClickOpen(item)}
                      >
                        <CardContent>
                          <Typography variant="h5">{item.difficulty}</Typography>
                        </CardContent>
                      </Card>
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            isCorrect();
            handleClose();
          },
          sx: {
            backgroundColor: '#000080',
            border: '2px solid #FFD700',
            color: '#FFD700',
            borderRadius: '0',
            width: '600px',
          },
        }}
      >
        <DialogTitle
          sx={{ color: '#FFD700', textAlign: 'center', fontSize: '24px' }}
        >
          {selectedItem?.category}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: '#FFD700', fontSize: '18px' }}
          >
            {selectedItem?.question}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="answer"
            name="answer"
            value={input.answer}
            onChange={handleChange}
            label="Ваш ответ"
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{
              style: { color: '#FFD700' },
            }}
            InputProps={{
              style: { color: '#FFD700' },
            }}
            sx={{
              '& .MuiInput-underline:before': { borderBottomColor: '#FFD700' },
              '& .MuiInput-underline:hover:before': {
                borderBottomColor: '#FFD700',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#FFD700',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ color: '#FFD700', fontSize: '18px' }}
          >
            Закрыть
          </Button>
          <Button type="submit" sx={{ color: '#FFD700', fontSize: '18px' }}>
            Ответить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
