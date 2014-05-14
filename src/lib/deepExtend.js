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
