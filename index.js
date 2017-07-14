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

function getBarHeight(magnitude, maximum) {
  if (magnitude === 0) return 0;
  return 100 * magnitude / maximum;
}

/* map an array of magnitudes into bar heights, widths and offsets */
function getBars(data) {
  const totalBars = data.length;
  const width = 100 / totalBars;
  let maximum = 0;

  if (totalBars) maximum = Math.max(...data);

  return data.map((magnitude, index) => {
    return {
      height: getBarHeight(magnitude, maximum),
      width,
      offset: getBarOffset(index, totalBars),
    };
  });
}

/* Create a bar chart SVG */
module.exports = {
  getBarOffset,
  getBarHeight,
  getBars,
  svg,
};
