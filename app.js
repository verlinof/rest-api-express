const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/image');

app.use(bodyParser.json());

//Static for images
app.use('/uploads', express.static('uploads'));
//Routes
app.use('/posts', postRoute);
app.use('/auth', userRoute);
app.use('/images', imageRoute);

module.exports = app