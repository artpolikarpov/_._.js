/*!
 * _._.js 0.1.0 | https://github.com/artpolikarpov/_._.js
 */
(function (that, undefined) {
var __ = {};
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
__._deepExtend = function (dest) {
  _.each(Array.prototype.slice.call(arguments, 1), function (src) {
    _.each(src, function (value, key) {
      if (_.isObject(value)) {
        if (_.isObject(dest[key]) && _.isObject(value)) {
          _._deepExtend(dest[key], value);
        } else {
          dest[key] = value;
        }
      } else {
        dest[key] = value;
      }
    });
  });

  return dest;
};

__._isPlainObject = function (object) {
  return _.isObject(object) && object.constructor === that.Object && !_.isArguments(object);
};
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

_.mixin(__);
})(this);