'use strict';

const svgOpenTag = '<svg>';
const svgCloseTag = '</svg>';

function svg(data) {
  return `${svgOpenTag}${svgCloseTag}`;
}

/* get x-offset of bar a zero-based index */
function getBarOffset(index, totalBars) {
  return (100 / totalBars) * index;
}

function getBarHeight(magnitude, index, totalBars) {

}

/* Create a bar chart SVG */
module.exports = {
  getBarOffset,
  getBarHeight,
  svg,
};
