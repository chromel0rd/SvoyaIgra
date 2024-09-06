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
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import getQuestionThunk from '../../../redux/slices/quistion/questionThunk';

export default function GamePages(): JSX.Element {
  const question = useAppSelector((store) => store.question);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState({ answer: '' });
 

  useEffect(() => {
    void dispatch(getQuestionThunk());
  }, []);
//   const [localQuestions, setLocalQuestions] = useState(question);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof question)[number] | null>(null);

  const handleClickOpen = (item: (typeof question)[number]) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  // Автоматическое закрытие диалогового окна через 5 секунд
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (open) {
      timer = setTimeout(() => {
        handleClose();
      }, 5000); // Закрыть через 5 секунд
    }

    return () => {
      clearTimeout(timer); // Очистить таймер при закрытии модального окна или при размонтировании компонента
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

//   console.log(selectedItem);

  const isCorrect = () => {
    if (selectedItem) {
      if (input.answer.toLowerCase() === selectedItem.answer.toLowerCase()) { //сравнение
        console.log('Yes');
      } else {
        console.log('No');
      }
    }
    setInput({ answer: '' });
    // setLocalQuestions((prevQuestions) =>
    //     prevQuestions.filter((item) => item !== selectedItem)
    //   );
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {/* Проходим по каждой категории */}
            {Object.entries(groupedData).map(([category, items]) => (
              <TableRow key={category}>
                {/* Отображаем название категории слева */}
                <TableCell>
                  <Typography variant="h6" textAlign="center">
                    {category}
                  </Typography>
                </TableCell>

                {/* Отображаем карточки с ценами */}
                {items.map((item, index) => (
                  <TableCell key={index}>
                    <Card
                      sx={{
                        width: 100,
                        textAlign: 'center',
                        padding: 2,
                        backgroundColor: '#2979ff',
                        color: 'white',
                        cursor: 'pointer', // Добавляем курсор для указания кликабельности
                      }}
                      onClick={() => handleClickOpen(item)}
                    >
                      <CardContent>
                        <Typography variant="h6">{item.difficulty}</Typography>
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
            isCorrect()
            // console.log(input.answer);
            handleClose();
          },
        }}
      >
        <DialogTitle>{selectedItem?.category}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedItem?.question}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            value={input.answer}
            onChange={handleChange}
            label="Ваш ответ"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button type="submit">Ответить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
