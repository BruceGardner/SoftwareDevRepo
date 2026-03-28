function sortBy(criteria, products) {
  const sorted = [...products]; // copy so we don’t mutate original
  if (criteria === 'nameAscending') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (criteria === 'priceAscending') {
    return sorted.sort((a, b) => a.price - b.price);
  } else if (criteria === 'ratingDescending') {
    return sorted.sort((a, b) => b.rating - a.rating);
  } else {
    return sorted;
  }
}

module.exports = { sortBy };