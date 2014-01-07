var should = require('should');

describe("urlize", function ( ) {
  describe('node module', function ( ) {
    it('should require', function (done) {
      var urlize = require('../');
      done( );
    });
  });
  describe('should create urls', function ( ) {
    var urlize = require('../');
    it('given a base url', function (done) {
      var base = urlize('http', 'example.com', 'base');
      base.should.equal('http://example.com/base');
      describe('base should also have urlize', function ( ) {
        it('should work with relative paths', function (done) {
          var bop = base.urlize('foo/bar', 'baz', 'bop')
          bop.should.equal('http://example.com/base/foo/bar/baz/bop');
          var baz = bop.urlize('../index')
          baz.should.equal('http://example.com/base/foo/bar/baz/index');
          var foo = baz.urlize('../../../index');
          foo.should.equal('http://example.com/base/foo/index');
          var rebase = foo.urlize('../..');
          rebase.should.equal('http://example.com/base');
          done( );
        });
        it('should switch hosts', function (done) {
          var rehost = base.urlize('https://rehost.io/another/base');
          rehost.should.equal('https://rehost.io/another/base');
          done( );
        });
        done( );
      });
    });
  });
});


