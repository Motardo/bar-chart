'use strict';

const expect = require('chai').expect;
const barChart = require('../index.js');

describe('#barChart', function() {
  const svg = barChart.svg;
  it('should return empty chart when given no data', function() {
    const result = svg({});
    expect(result).to.equal('<svg></svg>');
  });
});

describe('#getBarOffset', function() {
  const getBarOffset = barChart.getBarOffset;

  it('should put index 0 at 0', function() {
    expect(getBarOffset(0, 1)).to.equal(0);
    expect(getBarOffset(0, 3)).to.equal(0);
    expect(getBarOffset(0, 7)).to.equal(0);
  });
});
