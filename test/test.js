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

  it('should return the correct offset', function() {
    expect(getBarOffset(0, 1)).to.equal(0);
    expect(getBarOffset(1, 2)).to.equal(50);
    expect(getBarOffset(3, 5)).to.equal(60);
    expect(getBarOffset(3, 9)).to.be.approximately(100/3, 0.0001);
  });
});

describe('#getBarHeight', function() {
  const getBarHeight = barChart.getBarHeight;

  it('should return the correct height', function() {
    expect(getBarHeight(0, 0)).to.equal(0);
    expect(getBarHeight(0, 42)).to.equal(0);
    expect(getBarHeight(3, 9)).to.be.approximately(100/3, 0.0001);
  });
});

describe('#getBars', function() {
  const getBars = barChart.getBars;

  it('should handle empty data', function() {
    expect(getBars([])).to.eql([]);
  });

  it('should handle a single data point', function() {
    expect(getBars([0])).to.eql([{
      height: 0,
      width: 100,
      offset: 0,
    }]);
    expect(getBars([1])).to.eql([{
      height: 100,
      width: 100,
      offset: 0,
    }]);
    expect(getBars([5])).to.eql([{
      height: 100,
      width: 100,
      offset: 0,
    }]);
  });

  it('should handle multiple points', function() {
    expect(getBars([0, 1, 0, 2])).to.eql([
      {height: 0, width: 25, offset: 0},
      {height: 50, width: 25, offset: 25},
      {height: 0, width: 25, offset: 50},
      {height: 100, width: 25, offset: 75},
    ]);
  });
});
