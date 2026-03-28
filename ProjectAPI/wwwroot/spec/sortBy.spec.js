const testData = [
  { name: "Shovel", price: 10, inventory: 20, rating: 5 },
  { name: "Gloves", price: 6, inventory: 40, rating: 3 },
  { name: "Ski Mask", price: 12, inventory: 30, rating: 4 },
];

const { sortBy } = require('../sortBy'); // we’ll create this file next

describe('sortBy function', () => {

  it('should sort products alphabetically by name when "nameAscending" is passed', () => {
    const expectedOutput = [
      { name: "Gloves", price: 6, inventory: 40, rating: 3 },
      { name: "Shovel", price: 10, inventory: 20, rating: 5 },
      { name: "Ski Mask", price: 12, inventory: 30, rating: 4 },
    ];
    const actualOutput = sortBy('nameAscending', testData);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should sort products by increasing price when "priceAscending" is passed', () => {
    const expectedOutput = [
      { name: "Gloves", price: 6, inventory: 40, rating: 3 },
      { name: "Shovel", price: 10, inventory: 20, rating: 5 },
      { name: "Ski Mask", price: 12, inventory: 30, rating: 4 },
    ];
    const actualOutput = sortBy('priceAscending', testData);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should sort products by descending rating when "ratingDescending" is passed', () => {
    const expectedOutput = [
      { name: "Shovel", price: 10, inventory: 20, rating: 5 },
      { name: "Ski Mask", price: 12, inventory: 30, rating: 4 },
      { name: "Gloves", price: 6, inventory: 40, rating: 3 },
    ];
    const actualOutput = sortBy('ratingDescending', testData);
    expect(actualOutput).toEqual(expectedOutput);
  });

});