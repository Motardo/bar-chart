const express = require('express');
const barChart = require('./index.js');

const app = express();

app.get('/', (req, res) => {
  const data = [3.14, 4.54, 2.72, 8, 3.33];
  const config = {
    attributes: {
      chart: [
        'viewBox="0 0 120 240"', // the base image of the bars is 100 by 100 square
      ],
    },
    labels: ['Superman', 'Batman', 'Godzilla', 'Elmo', 'Thor'],
    fill: ['#b88'],
  };
  const chart = barChart.svg(data, config);
  res.send(chart); // in real life the chart would be included in a proper html 5 document
});

app.listen(3000);
