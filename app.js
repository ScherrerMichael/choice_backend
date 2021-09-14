const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const userRoutes = require('./api/routes/users');
// const roomRoutes = require('./api/routes/rooms');
const foodRoutes = require('./api/routes/foodItems');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

mongoose.connect('mongodb+srv://michael-admin:'
+process.env.MONGO_DB_PASSWORD +
'@cluster0.vzb0j.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//for cors errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, GET');
        return res.status(200).json({});
    }
    next();

})

//Routes that will handle http requests.
// app.use('/users', userRoutes);
// app.use('/rooms', roomRoutes);
app.use('/foodItems', foodRoutes);


// error handling for bad requests.
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;