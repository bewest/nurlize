
# nurlize

**N**ormalize **urls**.

The name **`nurlize`** refers to this npm module, **nurlize**.
The **function** it creates is called **urlize**.

## Install
[![Build
Status](https://travis-ci.org/bewest/nurlize.png?branch=master)](https://travis-ci.org/bewest/nurlize)
[![browser support](https://ci.testling.com/bewest/nurlize.png)](http://ci.testling.com/bewest/nurlize)

```bash
npm install nurlize
```
## Use
```javascript
var urlize = require('nurlize');
var base = urlize('http', 'example.com', 'base');
// 'http://example.com/base'
var bop = base.urlize('foo/bar', 'baz', 'bop')
// 'http://example.com/base/foo/bar/baz/bop'
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
var urlize = require('nurlize');

if (!module.parent) {
  var base = urlize('http', 'example.com', 'base');
  console.log('base', base);
  var bop = base.urlize('foo/bar', 'baz', 'bop')
  console.log('bop', bop);
  var baz = bop.urlize('../index')
  console.log('baz', baz);
  var foo = baz.urlize('../../../index');
  console.log('foo', foo);
  var rebase = foo.urlize('../..');
  console.log('rebase', rebase);
  var rehost = foo.urlize('https://rehost.io/another/base');
  console.log('rehost', rehost);

}

```

```bash
+ node test/example.js
base http://example.com/base
bop http://example.com/base/foo/bar/baz/bop
baz http://example.com/base/foo/bar/baz/index
foo http://example.com/base/foo/index
rebase http://example.com/base
rehost https://rehost.io/another/base
```
