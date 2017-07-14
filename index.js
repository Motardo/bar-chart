'use strict';

const svgOpenTag = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
const svgCloseTag = '</svg>';

function svg(data) {
  const rects = makeRects(data);
  return `${svgOpenTag}${rects}${svgCloseTag}`;
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

function makeRectTag(x, y, height, width, stroke, fill) {
  const rectTag = `<rect x="${x}" y="${y}" \
    height="${height}" width="${width}" \
    style="stroke: ${stroke}; fill: ${fill};"/>`;
  return rectTag;
}

function makeRects(data) {
  getBars(data).map((bar) => {
    return makeRectTag(bar.offset, 0, bar.height, bar.width, '#333', 'ccc');
  });
}

/* Create a bar chart SVG */
module.exports = {
  getBarOffset,
  getBarHeight,
  getBars,
  makeRectTag,
  makeRects,
  svg,
};
