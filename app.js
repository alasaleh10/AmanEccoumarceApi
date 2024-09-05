// AmanEccoumarce Api Project
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });


const globalError = require('./Middleware/ErrorMiddleware');
const sendFailureResponse = require('./utils/ResponseHepler/SendFailureResponse');
const { connectDB } = require('./Config/database');
const userApi = require('./Api/UserApi');

connectDB();
// 

// Midalware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '')));
if (process.env.type === 'dev') {
    app.use(morgan('dev'));
}
app.use('/api/users', userApi);

app.all('*', (req, res) => {

    return sendFailureResponse(res, 404, `Cant Fine Rout${req.originalUrl}`);
});



app.use(globalError);










// Run Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {

    console.log(`server started ${PORT}`);
    console.log(`http://localhost:${PORT}`);

});

process.on('unhandledRejection', (err) => {
    
    console.log(`UNHANDLER REJECTION! Error ${err.name} | ${err.message}`);


    server.close(() => {
       
        process.exit(1);

    });
})



