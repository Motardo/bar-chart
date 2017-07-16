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
  // map each datum into an object containing a text and rect tag
  const tags = makeTags(data, config);
  // unzip the text and rect tags into their own arrays
  const {textTags, rectTags} = tags.reduce((acc, dataPoint) => {
    acc.textTags.push(dataPoint.textTag);
    acc.rectTags.push(dataPoint.rectTag);
    return acc;
  }, {textTags: [], rectTags: []});
  const bars = makeTag('g', rectTags, (config.attributes || {}).bars);
  const labels = makeTag('g', textTags, (config.attributes || {}).labels);
  return svgTag(`${bars}${labels}`, (config.attributes || {}).chart);
}

function svgTag(inner, attributes = []) {
  const namespace = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
  attributes.unshift(namespace);
  return makeTag('svg', inner, attributes);
}

function makeTag(type, inner, attributes = []) {
  attributes.push('>');
  const openTag = attributes.reduce((acc, attribute) => {
    return `${acc} ${attribute}`;
  }, `<${type}`);
  return `${openTag}${inner}</${type}>`;
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

function makeTags(data, config) {
  const stroke = config.stroke || ['#fff'];
  const fill = config.fill || ['#ccc'];
  const labels = config.labels || [];
  const labelOptions = config.labelOptions || {};
  const makeTextTag = labelBelow;
  let textTag = '';

  return getBars(data).map((bar, index) => {
    const nextStroke = stroke[index % stroke.length];
    const nextFill = fill[index % fill.length];
    const rectTag = makeRectTag(bar.offset, 100 - bar.height, bar.height, bar.width, nextStroke, nextFill);
    if (labels[index]) {
      textTag = makeTextTag(bar.offset, labels[index], labelOptions);
    }
    return {textTag, rectTag};
  });
}

// <text x="5" y="105" font-size="8px" transform="rotate(50 5,105)">Superman</text>
function labelBelow(offset, label, config = {}) {
  const fontSize = (config || {}).fontSize || "8px";
  const rotate = (config || {}).rotate || 60;
  const x = offset + ((config || {}).padding || 7);
  const y = 105;

  return `<text x="${x}" y="${y}" font-size="${fontSize}" \
  transform="rotate(${rotate} ${x},${y})">${label}</text>`;
}

/* Create a bar chart SVG */
module.exports = {
  getBarOffset,
  getBarHeight,
  getBars,
  makeRectTag,
  makeTags,
  svg,
};
