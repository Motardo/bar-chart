'use strict';

/**
 * @param {Array} data
 * @param {Object} config
 *
 * @return {string} svg markup for chart
 *
 * data is an array of magnitudes
 * config Object properties are:
 *  - attributes (array of strings to include in svg tag)
 *    for example ['viewBox="0 0 100 100"', 'transform="rotate(90)"']
 *  - stroke (array of color strings)
 *    for example ['#abc89d', '#0F0']
 *  - fill (array of color strings)
 *    for example ['#abc89d', 'blue' 'green']
 *  - labels (array of Objects with text and position properties)
 */

function svg(data = [], config = {}) {
  const svgCloseTag = '</svg>';
  const rects = makeRects(data, config);
  const svgOpenTag = openSvg(config.attributes);
  return `${svgOpenTag}${rects}${svgCloseTag}`;
}

function openSvg(attributes = []) {
  const preamble = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
  attributes.push('>');
  return attributes.reduce((acc, attribute) => {
    return `${acc} ${attribute}`;
  }, preamble);
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

function makeRects(data, config) {
  const stroke = config.stroke || ['#fff'];
  const fill = config.fill || ['#ddd'];

  return getBars(data).map((bar, index) => {
    const nextStroke = stroke[index % stroke.length];
    const nextFill = fill[index % fill.length];
    return makeRectTag(bar.offset, 100 - bar.height, bar.height, bar.width, nextStroke, nextFill);
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
