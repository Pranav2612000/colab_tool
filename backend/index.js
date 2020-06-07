const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');


const app = express();
connectDB();

const port = process.env.PORT || 5000;
/*
const usersRouter = require('./routes/users');
//const updateLogs = require('./routes/updateLogs')
const adminsRouter = require('./routes/admins');
const cronJobRouter = require('./routes/cron');
*/
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');

//app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(cors());
const bodyParser = require('body-parser');
app.use(express.urlencoded({ limit: '50mb' }));
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/board', boardRouter);
// app.use('/api/users', usersRouter);
/*
app.use('/api/users', usersRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/cron', cronJobRouter);
*/

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});


