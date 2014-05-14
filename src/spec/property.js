describe('_._property', function () {
  it('exists', function () {
    expect(_._property).toEqual(jasmine.any(Function));
  });

  it('get property with _._property(object, key)', function () {
    var a = {b: 'c', d: {e: 'f'}};

    expect(_._property(a, 'b')).toBe(a.b);
    expect(_._property(a, 'c')).toBe(a.c);
    expect(_._property(a, 'd')).toBe(a.d);
    expect(_._property(a, 'd.e')).toBe(a.d.e);
    expect(_._property(a, 'd.e.g')).toBe(a.d.g);
    expect(_._property(a, 'h.i')).toBeUndefined();
    expect(_._property(a, 'h.i.j')).toBeUndefined();
  });

  it('set property with _._property(object, key, value)', function () {
    var a = {};

    expect(_._property(a, 'b', 'c')).toEqual(a);
    expect(a).toEqual({b: 'c'});
    expect(_._property(a, 'd.e', 'f')).toEqual({b: 'c', d: {e: 'f'}});
    expect(_._property(a, 'g', 'h')).toEqual({b: 'c', d: {e: 'f'}, g: 'h'});
    expect(_._property(a, 'g.h', 'i')).toEqual({b: 'c', d: {e: 'f'}, g: {h: 'i'}});
    expect(_._property(a, 'g.h.j.k', 'l')).toEqual({b: 'c', d: {e: 'f'}, g: {h: {j: {k: 'l'}}}});
    expect(_._property(a, 'g.m', 'n')).toEqual({b: 'c', d: {e: 'f'}, g: {h: {j: {k: 'l'}}, m: 'n'}});
  });

  it('chainable', function () {
    expect(_({a: 'b'})._property('a')).toBe('b');
    expect(_({})._property('a', 'c')).toEqual({a: 'c'});

    expect(
        _.chain([['a', 'b'], ['c', 'd'], ['e', 'f']])
            .object()
            ._property('c')
            .value()
    ).toBe('d');

    expect(
        _.chain([{a: 'b'}, {a: 'c'}])
            .findWhere({a: 'b'})
            ._property('c.d.e', 'f')
            .value()
    ).toEqual({a: 'b', c: {d: {e: 'f'}}});
  });
});