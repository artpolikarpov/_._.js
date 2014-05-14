__._isPlainObject = function (object) {
  return _.isObject(object) && object.constructor === that.Object && !_.isArguments(object);
};