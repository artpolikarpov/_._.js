__._compact = function (collection) {
  if (_._isPlainObject(collection)) {
    var clone = _.clone(collection);
    _.each(collection, function (value, key) {
      if (!value) {
        delete clone[key];
      }
    });
  
    return clone;
  } else {
    return _.compact(collection);
  }
};