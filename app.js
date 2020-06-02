const express = require('express');
const fs = require('fs');
const route = require('route');
const app = express();

app.use(express.json());

const toursData = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/tours.json`)
);

const getAlltours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: toursData.length,
        data: {
            tours: toursData,
        },
    });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
    res.status(200).json({
        data: {
            tour: '<Updated tour here>',
        },
    });
};

const deleteTour = (req, res) => {
    res.status(204).json({
        data: null,
    });
};

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route not implemented',
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route not implemented',
    });
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route not implemented',
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route not implemented',
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'fail',
        message: 'This route not implemented',
    });
};

app.route('/api/v1/tours').get(getAlltours).post(createTour);
app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app.route('/api/v1/users/').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

app.listen(8000, () => {
    console.log('Server runs port 8000...');
});
