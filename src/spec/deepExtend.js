describe('_._deepExtend', function () {
  it('exists', function () {
    expect(_._deepExtend).toEqual(jasmine.any(Function));
  });

  it('extends deeply', function () {
    expect(_._deepExtend({}, {})).toEqual({});

    var a = {a: 'b', c: {d: 'e'}},
        b = {a: 'a', b: 'b', c: {f: 'g'}};

    // Normal extend, just mention
    expect(
        _.extend(_.clone(a), b)
    ).toEqual({a: 'a', b: 'b', c: {f: 'g'}});

    // Deep extend is different
    expect(
        _._deepExtend(_.clone(a), b)
    ).toEqual({a: 'a', b: 'b', c: {d: 'e', f: 'g'}});

    expect(
        _._deepExtend({a: 'b', c: 'd'}, {a: 'a', b: 'b', c: {f: 'g'}})
    ).toEqual({a: 'a', b: 'b', c: {f: 'g'}});
  });

  it('very deeply', function () {
    expect(
        _._deepExtend({a: 'b', c: {d: {e: {f: 'g'}}}}, {c: {d: {e: {h: 'i'}, j: 'k'}}})
    ).toEqual({a: 'b', c: {d: {e: {f: 'g', h: 'i'}, j: 'k'}}});
  });

  it('accepts multiple source objects', function () {
    expect(
        _._deepExtend({}, {a: 'b', c: {d: 'e', f: {g: {h: 'i'}}}}, {a: 'a', b: 'b', c: {f: {g: 'hi'}}}, {c: {f: {j: 'k'}}})
    ).toEqual({a: 'a', b: 'b', c: {d: 'e', f: {g: 'hi', j: 'k'}}});
  });

  it('overrides destination object, not sources', function () {
    var dest = {},
        _src1 = {a: 'a', b: {c: 'd', e: {f: 'g'}}},
        _src2 = {a: {a: 'a', b: 'b'}, b: {e: {h: 'i'}}},
        src1 = _.clone(_src1),
        src2 = _.clone(_src2);

    _._deepExtend(dest, src1, src2);

    expect(dest).toEqual({a: {a: 'a', b: 'b'}, b: {c: 'd', e: {f: 'g', h: 'i'}}});
    expect(src1).toEqual(_src1);
    expect(src2).toEqual(_src2);
  });

  it('also works like normal _.extend', function () {
    var cases = [
        "[{a: 'a'}, {b: 'b'}]",
        "[{}, {a: 'a', b: {}}, {b: 'b'}]",
        "[{}, {a: 'a', b: 'b'}, {b: {b: 'b'}}]",
        "[0, {}]",
        "[{}, 1]",
        "[100, 500]",
        "[null, true]"
    ];

    for (var _i = 0, _l = cases.length; _i < _l; _i++) {
      expect(_._deepExtend.apply(_, eval(cases[_i]))).toEqual(_.extend.apply(_, eval(cases[_i])));
    }
  });

  it('chainable', function () {
    expect(_({a: 'b', c: {d: {e: 'f'}}})._deepExtend({c: {d: {g: 'h'}}})).toEqual({a: 'b', c: {d: {e: 'f', g: 'h'}}});

    expect(
        _.chain({})
            .extend({a: {b: 'c', d: 'e'}})
            ._deepExtend({a: {b: 'b', c: 'c'}, d: 'd'})
            .value()
    ).toEqual({a: {b: 'b', c: 'c', d: 'e'}, d: 'd'});
  });
});