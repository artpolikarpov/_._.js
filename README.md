# \_._.js

Four utility functions on top of Underscore. Well-tested.

## _compact `_._compact(list)`

Returns a copy of the list with all falsy values removed.

```javascript
_._compact([0, 1, false, 2, '', 3]);
// [1, 2, 3]

_._compact({a: null, b: 1, c: NaN});
// {b: 1}
```


## _deepExtend `_._deepExtend(destination, *sources)`

Copy all of the properties (including the properties of the properties of the properties...) in the source objects over to the destination object, and return the destination object.

```javascript
_._deepExtend({name: 'moe', logins: {skype: 'moe64'}}, {age: 50, logins: {twitter: 'moe64twi'}});
// {name: 'moe', logins: {skype: 'moe64', twitter: 'moe64twi'}, age: 50}
```


## _property `_._property(object, path, [value])`

Returns the property of an object by evaluating the path. Path is a series of one or more identifiers separated by \.\. Does not throw when trying to index into a non-object or an undefined value.

```javascript
_._property({name: 'moe', logins: {skype: 'moe64'}}, 'logins.skype');
// 'moe64'

_._property({name: 'moe', logins: {skype: 'moe64'}}, 'logins.email.primary');
// undefined
```

Set the property at any level of an object. Returns the modified object.

```javascript
_._property({name: 'moe'}, 'logins.email.primary', 'moe64@example.com');
// {name: 'moe', logins: {email: {primary: 'moe64@example.com'}}}
```


## _isPlainObject `_._isPlainObject(value)`

Returns true if value is an plain object, not a function or an array.

```javascript
_._isPlainObject({});
=> true

_._isPlainObject([]);
=> false
```
