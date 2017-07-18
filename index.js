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
 *  - labels (array of strings to label the x axis)
 */

function svg(data = [], config = {}) {
  // map each datum into an object containing a text and rect tag
  const tags = makeTags(data, config);
  // unzip the text and rect tags into their own arrays
  const {textTags, rectTags, barDecorationTags} = tags.reduce(
    (acc, dataPoint) => {
      acc.textTags.push(dataPoint.textTag);
      acc.rectTags.push(dataPoint.rectTag);
      acc.barDecorationTags.push(dataPoint.barDecorationTag);
      return acc;
    },
    {textTags: [], rectTags: [], barDecorationTags: []}
  );
  const bars = makeTag('g', rectTags, (config.attributes || {}).bars);
  const labels = makeTag('g', textTags, (config.attributes || {}).labels);
  const barDecorations = makeTag(
    'g',
    barDecorationTags,
    (config.attributes || {}).barDecorations
  );
  return svgTag(
    `${bars}${labels}${barDecorations}`,
    (config.attributes || {}).chart
  );
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
      magnitude,
      height: getBarHeight(magnitude, maximum),
      width,
      offset: getBarOffset(index, totalBars),
    };
  });
}

function makeRectTag(bar, stroke, fill) {
  const x = bar.offset;
  const y = 100 - bar.height;
  const height = bar.height;
  const width = bar.width;

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
  const barDecorationOptions = config.barDecorationOptions || {};
  const makeTextTag = labelBelow;
  let textTag = '';
  let barDecorationTag = '';

  return getBars(data).map((bar, index) => {
    const nextStroke = stroke[index % stroke.length];
    const nextFill = fill[index % fill.length];
    const rectTag = makeRectTag(bar, nextStroke, nextFill);
    if (labels[index]) {
      textTag = makeTextTag(bar.offset, labels[index], labelOptions);
    }
    let barDecoration = config.barDecoration;
    if (typeof barDecoration !== 'function') {
      if (barDecoration === 'above') {
        barDecoration = numberAbove;
      } else {
        barDecoration = false;
      }
    }
    if (barDecoration) {
      barDecorationTag = barDecoration(bar, index, barDecorationOptions);
    }
    return {textTag, rectTag, barDecorationTag};
  });
}

function numberAbove(bar, index, config = {}) {
  const x = bar.offset;
  const y = 100 - bar.height;
  const fontSize = (config || {}).fontSize || '8px';

  return `<text x="${x}" y="${y}" font-size="${fontSize}"> \
  ${bar.magnitude}</text>`;
}

// <text x="5" y="105" font-size="8px" transform="rotate(50 5,105)">
// Superman</text>
function labelBelow(offset, label, config = {}) {
  const fontSize = (config || {}).fontSize || '8px';
  const rotate = (config || {}).rotate || 90;
  // half of the bar width, then back 1/4 the font size
  const x = offset + ((config || {}).padding || 8);
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
