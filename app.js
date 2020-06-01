const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const toursData = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/tours.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: toursData.length,
        data: {
            tours: toursData,
        },
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = toursData.find((el) => el.id === id);
    //if (id > toursData.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        results: toursData.length,
        data: {
            tours: tour,
        },
    });
});

app.post('/api/v1/tours', (req, res) => {
    const newId = toursData[toursData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    toursData.push(newTour);

    fs.writeFile('./dev-data/tours.json', JSON.stringify(toursData), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour,
            },
        });
    });
});

app.listen(8000, () => {
    console.log('Server runs port 8000...');
});
