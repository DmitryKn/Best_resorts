const mongoose = require('mongoose');
const dotenv = require('dotenv');

//handle UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION... Shutting down');
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

//DB connection
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connections successful !'));

//  Server starts
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Server runs port 8000...');
});

//handle UNHANDLED REJECTION
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('UNHANDLED_REJECTION... Shutting down');
    server.close(() => {
        process.exit(1);
    });
});
