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
To run the demo:
```sh
git clone git@github.com:Motardo/bar-chart.git
cd bar-chart && npm install
node demo.js
```

And visit `localhost:3000` in a web browser to see the example chart.

## API
The module exposes one method `svg` which takes an array of numbers for data to
construct the bar chart. An optional `config` object may be given as a second parameter.

### Config
Properties may include:
 - `attributes`: an object with three porpoerties
   * `chart`: an array of attributes to include in the outer svg tag
   * `bars`: an array of attributes to apply to the bars as a group
   * `labels`: like `bars` but for the labels as a group
 - `fill`: an array of strings representing fill colors to cycle through for each bar (default is `["#ccc"]`)
 - `stroke`: like `fill`, but for the stroke colors
 - `labels`: an array of strings to label the data
 - `labelOptions`: an object to configure the label appearance
   * `fontSize`: default is `"10px"`
   * `rotate`: default is `60`
   * `padding`: default is `7`
