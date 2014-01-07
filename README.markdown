
# NUrlize

Normalize urls.

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
