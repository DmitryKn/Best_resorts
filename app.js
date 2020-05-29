const express = require('express');
const fs = require('fs');

const app = express();

const toursData = JSON.parse(fs.readFileSync('./dev-data/tours.json'));
app.get('/api/v1/tours', (req, res) => {
    res.json(toursData);
});

app.listen(8000, () => {
    console.log('Server runs port 8000...');
});
