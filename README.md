# bar-chart
Create a bar chart SVG

## Installation
`npm install @motardo/bar-chart`

## Basic Usage
```js
const barChart = require('@motardo/bar-chart');

const data = [42, 73, 69]; // or whatever data you want
const chart = barChart.svg(data);
```
The output is the `<svg>` string for drawing the chart

## Example with Express
```sh
mkdir myApp && cd myApp
npm init -y
npm i @motardo/bar-chart express
```

Create `index.js`
```
// index.js
const express =  require('express');
const barChart = require('../bar-chart/index.js');

const app = express();

app.get('/', (req, res) => {
  const data = [3.14, 4.54, 2.72, 4, 3.33];
  const config = {
    attributes: [
      'viewBox="0 0 100 100"', // the chart base image is 100 by 100 square
      'transform="rotate(90)"' // make a sideways chart
    ],
    fill: ['red', 'blue'] // alternate red and blue
  };
  const chart = barChart.svg(data, config);
  res.send(chart); // in real life the chart would be included in a proper html 5 document
});

app.listen(3000);
```

Then run the app
```sh
node index.js
```

And visit `localhost:3000` in a web browser to see the chart.

## API
The module exposes one method `svg` which takes an array of numbers for data to
construct the bar chart. An optional `config` object may be given as a second parameter.

### Config
Properties may include:
 - `attributes`: an array of strings to include in the svg tag
 - `fill`: an array of strings representing fill colors to cycle through for each bar
 - `stroke`: like `fill`, but for the stroke colors
