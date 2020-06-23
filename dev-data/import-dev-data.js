// special script for load data file to db.
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../models/tourModel');

//DB connection
const DB =
    'mongodb+srv://Dimko:613040Abcd@cluster0-xuwwp.mongodb.net/best_resorts?retryWrites=true&w=majority';
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connections successful !'));

//reading JSON file
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data to database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded');
    } catch (error) {
        console.log(err);
    }
    process.exit();
};

//delete all previous data from DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted');
    } catch (error) {
        console.log(err);
    }
    process.exit();
};

//tricks with process.argv
//console.log(process.argv);
// принимает значения после #node import-dev-data.js --import, --delete
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
