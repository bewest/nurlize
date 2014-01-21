var path = require('path');

var normalize = path.normalize;

var ABS = '://';
var ONE = '/';
var DOT = '.';

function join (parts) {
  return parts.join(ONE);
}

function valid (url) {
  var schemes = url.split(ABS);
  var base = schemes.shift( );
  var tail = schemes.shift( );
  var parts = (tail || '').split(ONE);
  var host = parts.shift( );
  var begin = base + ABS + host;
  var end = normalize(join(parts));
  if (parts.length == 1) {
    end = parts[0];
  }
  return [begin, end];
}

function urlize (head) {
  var tail = Array.prototype.slice.call(arguments, 1);
  var end = '';
  if (tail.length > 0) { end = normalize(join(tail)); }
  if (end[0] == DOT) { end = ONE + end; };
  return join(valid(head + end));
}

module.exports = function wrap ( ) {
  var original = urlize.apply(null, arguments);
  var result = new String(original);
  function base ( ) {
    var r = valid(original.toString( )).shift( );
    return r;
  }
  function quine (op) {
    var parts = Array.prototype.slice.call(arguments);
    if (!op) { parts.unshift(original); }
    if (parts[0] == ONE || (op && op[0] == ONE)) { parts.unshift(base( )); }
    if (parts[0].split(ABS).length == 1)
      parts.unshift(original);
    return wrap.apply(null, parts);
  }

  result.urlize = quine;
  return result;
}
