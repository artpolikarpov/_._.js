describe('_._isPlainObject', function () {
  it('exists', function () {
    expect(_._isPlainObject).toEqual(jasmine.any(Function));
  });

  it('detects objects only, not arrays, not functions', function () {
    expect(_._isPlainObject({})).toBe(true);
    expect(_._isPlainObject('1')).toBe(false);
    expect(_._isPlainObject(arguments)).toBe(false);
    expect(_._isPlainObject([1, 2, 3])).toBe(false);
    expect(_._isPlainObject(function () {})).toBe(false);
    expect(_._isPlainObject(true)).toBe(false);
  });

  it('chainable', function () {
    expect(_([1, 2, 3])._isPlainObject()).toBe(false);
    expect(
        _.chain([1, 2, 3])
            .map(function (num) {
              return [num, num]
            })
            .object()
            ._isPlainObject()
            .value())
        .toBe(true);
  });
});