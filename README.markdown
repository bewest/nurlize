# nurlize

**N**ormalize **urls**.

The name **`nurlize`** refers to this npm module, **nurlize**.
The **function** it creates is called **urlize**.

## Install
```bash
npm install nurlize
```
### Status
[![Build
Status](https://travis-ci.org/bewest/nurlize.png?branch=master)](https://travis-ci.org/bewest/nurlize)
[![browser support](https://ci.testling.com/bewest/nurlize.png)](http://ci.testling.com/bewest/nurlize)
[![Coverage Status](https://coveralls.io/repos/bewest/nurlize/badge.png)](https://coveralls.io/r/bewest/nurlize)

## Use
```javascript
var urlize = require('nurlize');
var base = urlize('http', 'example.com', 'base');
// 'http://example.com/base'
var bop = base.urlize('foo/bar', 'baz', 'bop')
// 'http://example.com/basefoo/bar/baz/bop'
```

## `urlize(base, [...]) -> url`

Normalize uri components.  Allows programmatically constructing urls given a
base URL.

## `url.urlize([...]) -> url`
The url returned has a function called urlize which does the same thing but
with the previous value as the base URL.

Inputs expressed as relative urls this way will always resolve to an absolute
url relative to that base url.  Results curried using `url.urlize` will
"reset" `urlize` to use that url as the new base.

### Example
```javascript
var urlize = require('../');

if (!module.parent) {
  var base = urlize('http://', 'example.com', 'base');
  console.log('base', base.toString( ));
  var bop = base.urlize('foo/bar', 'baz', 'bop')
  console.log('bop', bop.toString( ));
  console.log('bop()', bop.urlize( ).toString( ));
  console.log('bop(/)', bop.urlize('/').toString( ));
  var baz = bop.urlize('/path/bazz/new/base')
  console.log('baz', baz.toString( ));
  var foo = baz.urlize('../../../index');
  console.log('foo', foo.toString( ));
  var rebase = foo.urlize('../..');
  console.log('rebase', rebase.toString( ));
  var rehost = foo.urlize('https://rehost.io/another/base');
  console.log('rehost', rehost.toString( ));

}

```

```bash
base http://example.com/base
bop http://example.com/basefoo/bar/baz/bop
bop() http://example.com/basefoo/bar/baz/bop
bop(/) http://example.com/
baz http://example.com/path/bazz/new/base
foo http://example.com/path/index
rebase http://example.com/.
rehost https://rehost.io/another/base
```
