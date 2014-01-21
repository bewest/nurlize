var urlize = require('../');

if (!module.parent) {
  var base = urlize('http://', 'example.com', 'base');
  console.log('base', base.toString( ));
  var bop = base.urlize('foo/bar', 'baz', 'bop')
  console.log('bop', bop.toString( ));
  console.log('bop()', bop.urlize( ).toString( ));
  console.log('bop(/)', bop.urlize('/').toString( ));
  var baz = bop.urlize('../index')
  console.log('baz', baz.toString( ));
  var foo = baz.urlize('../../../index');
  console.log('foo', foo.toString( ));
  var rebase = foo.urlize('../..');
  console.log('rebase', rebase.toString( ));
  var rehost = foo.urlize('https://rehost.io/another/base');
  console.log('rehost', rehost.toString( ));

}

