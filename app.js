const express = require('express');
const cookie = require('cookie-parser');
const app = express();
const userRoute = require('./routes/userRoute')
const bookRoute = require('./routes/bookRoute')

app.use(express.json());
app.use(cookie());

app.use('/api/v1/users',userRoute);
app.use('/api/v1/books',bookRoute);

module.exports = app;