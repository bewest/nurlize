var path = require('path');

var normalize = path.normalize;

var ABS = '://';
var ONE = '/';

function urlize (head) {
  var tail = Array.prototype.slice.call(arguments, 1);
  var schemes = head.split(ABS);
  var base = schemes.shift( );
  var host = schemes.shift( );

  if (host) {
    tail.unshift(host);
  }
  if (base) {
    return base + ABS + normalize(tail.join(ONE));
  }
  return head + ABS + normalize(tail.join(ONE));
}

module.exports = function wrap ( ) {
  var original = urlize.apply(null, arguments);
  var result = new String(original);
  function quine ( ) {
    var parts = Array.prototype.slice.call(arguments);
    if (parts[0].split(ABS).length == 1)
      parts.unshift(original);
    return wrap.apply(null, parts);
  }

  result.urlize = quine;
  return result;
}