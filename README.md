# bar-chart
Create a bar chart SVG

## Installation
`npm install @motardo/bar-chart`

## Basic Usage
```js
const barChart = require('@motardo/bar-chart');

const data = [42, 73, 69];

const chart = barChart.svg(data);
```
Output is the `<svg>` string for drawing the chart

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
const barChart = require('@motardo/bar-chart');

const app = express();

app.get('/', (req, res) => {
  const chart = barChart.svg([3.14, 4.54, 2.72]);
  res.send(chart);
});

app.listen(3000);
```
Then run the app
```sh
node index.js
```
And visit `localhost:3000` in a web browser to see the chart
