const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const questionRouter = require('./routes/questionRouter')

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/questions', questionRouter);