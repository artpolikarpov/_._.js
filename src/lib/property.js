__._property = function (object, key, value) {
  var property = object,
      levels = key.split('.');

  if (_.isUndefined(value)) {
    // Get property
    _.each(levels, function (key) {
      property = _.isObject(property) ? property[key] : undefined;
    });

    return property;
  } else {
    // Set property
    _.each(_.initial(levels), function (level) {
      property[level] = _.isObject(property[level]) ? property[level] : {};
      property = property[level];
    });

    property[_.last(levels)] = value;

    return object;
  }
};
