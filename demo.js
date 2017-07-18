const express = require('express');
// Note: require('@motardo/bar-chart') when using in your own project
const barChart = require('./index.js');

const app = express();

app.get('/', (req, res) => {
  const data = [3.14, 4.54, 2.72, 8, 3.33];
  const config = {
    attributes: {
      chart: [
        // the base image of the bars is 100 by 100 square
        'viewBox="0 0 120 150"',
      ],
      bars: [
        'transform="translate(0,10)"',
      ],
      labels: [
        'transform="translate(0,10)"',
      ],
      barDecorations: [
        'transform="translate(2,10)"',
        'fontSize="6px"',
      ],
    },
    labels: ['Superman', 'Batman', 'Godzilla', 'Elmo', 'Thor'],
    fill: ['#b88'],
    barDecoration: 'above',
    barDecorationOptions: {
      fontSize: '6px',
    },
    labelOptions: {
      rotate: 45,
    },
  };
  const chart = barChart.svg(data, config);
  /* in real life the chart would be included in a proper html 5 document
   * but for this demo we just send the chart by itself
   */
  res.send(chart);
});

app.listen(3000);
