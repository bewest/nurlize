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
          var rescheme = base.urlize('hakken://AAAA/another/base');
          rescheme.should.equal('hakken://AAAA/another/base');
          rescheme = rescheme.urlize('/AAAA');
          rescheme.should.equal('hakken://AAAA/AAAA');
          rescheme = rescheme.urlize('foo');
          rescheme.should.equal('hakken://AAAA/AAAAfoo');
          rescheme = rescheme.urlize('hakken://AAAA/BB/');
          rescheme.should.equal('hakken://AAAA/BB/');
          rescheme = rescheme.urlize('./CCC/DDD');
          rescheme.should.equal('hakken://AAAA/BB/CCC/DDD');
          rescheme = rescheme.urlize('../foo');
          rescheme.should.equal('hakken://AAAA/BB/CCC/foo');
          rescheme = rescheme.urlize('../');
          rescheme.should.equal('hakken://AAAA/BB/CCC/');
          rescheme = rescheme.urlize('../');
          rescheme.should.equal('hakken://AAAA/BB/');
          rescheme = rescheme.urlize('../');
          // this may or may not be reasonable
          rescheme.should.equal('hakken://AAAA/./');
          rescheme = rescheme.urlize('../');
          // this is downright silly
          rescheme.should.equal('hakken://AAAA/../');
          rescheme = rescheme.urlize('../');
          // ok, this is beyond silly, and is kind of ridiculous
          rescheme.should.equal('hakken://AAAA/../../');

          var valid = urlize.valid('hakken://AAAA/BB/');
          var p = valid.pop( );
          var S = valid.shift( );
          rescheme = rescheme.urlize(S, 'BBBB', p);
          rescheme.should.equal('hakken://BBBB/BB/');
          done( );
        });

      });
    });
  });
});


