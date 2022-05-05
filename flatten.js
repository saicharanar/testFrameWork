// flattens the given array 
const isArray = function (element) {
  return Array.isArray(element);
};

const flat = function (collection) {
  let flattedCollection = [];

  for (let index = 0; index < collection.length; index++) {
    flattedCollection = flattedCollection.concat(collection[index]);
  }

  return flattedCollection;
};

const flatten = function (lists) {
  let dupedLists = lists;
  if (dupedLists.length === 0) {
    return [];
  }

  while (dupedLists.some(isArray)) {
    dupedLists = flat(dupedLists);
  }

  return dupedLists;
};
exports.flatten = flatten;
