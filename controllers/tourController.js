const fs = require('fs');
const toursData = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/tours.json`)
);

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: toursData.length,
        data: {
            tours: toursData,
        },
    });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
    const newId = toursData[toursData.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    toursData.push(newTour);

    fs.writeFile('../dev-data/tours', JSON.stringify(toursData), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour,
            },
        });
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        data: {
            tour: '<Updated tour here>',
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        data: null,
    });
};
