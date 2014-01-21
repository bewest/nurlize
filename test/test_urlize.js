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
    describe('given a base url', function ( ) {
      var base = urlize('http://', 'example.com', 'base');
      it('should generate a base url', function (done) {
        base.should.equal('http://example.com/base');
        done( );
      });
      describe('base should also have urlize', function ( ) {
        it('should work with relative paths', function (done) {
          var bop = base.urlize('foo/bar', 'baz', 'bop')
          bop.should.equal('http://example.com/basefoo/bar/baz/bop');
          var baz = bop.urlize('../index')
          baz.should.equal('http://example.com/basefoo/bar/baz/index');
          var fixed = baz.urlize('/base/foo/bar/bazz/index');
          fixed.should.equal('http://example.com/base/foo/bar/bazz/index');
          var foo = fixed.urlize('../../../index');
          foo.should.equal('http://example.com/base/foo/index');
          foo.urlize( ).should.equal('http://example.com/base/foo/index');
          // leading slash should reset base url
          foo.urlize('/').should.equal('http://example.com/');
          var rebase = foo.urlize('/rebase/');
          rebase.should.equal('http://example.com/rebase/');
          done( );
        });
        it('should switch hosts', function (done) {
          var rehost = base.urlize('https://rehost.io/another/base');
          rehost.should.equal('https://rehost.io/another/base');
          done( );
        });

      });
    });
  });
});


