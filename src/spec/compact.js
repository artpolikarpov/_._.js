describe('_._compact', function () {
  it('exists', function () {
    expect(_._compact).toEqual(jasmine.any(Function));
  });

  it('compacts objects', function () {
    expect(
        _._compact({a: 'a', b: {}, c: 0, d: NaN, e: false, f: null, g: '', h: 'h', i: undefined})
    ).toEqual({a: 'a', b: {}, h: 'h'});
  });

  it('and arrays (like normal _.compact)', function () {
    expect(
        _._compact([0, 1, false, 2, '', 3])
    ).toEqual([1, 2, 3]);
  });

  it('chainable', function () {
    expect(_({a: 'b', c: !1})._compact()).toEqual({a: 'b'});

    expect(
        _.chain([['a', 'b'], ['c', undefined], ['d', 1]])
            .object()
            ._compact()
            .filter(function (value) {
              return _.isNumber(value)
            })
            ._compact()
            .value()[0]
    ).toBe(1);
  });
});