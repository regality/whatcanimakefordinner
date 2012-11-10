"use strict";

var browserijade = require('browserijade')
  , $            = require('jquery')
  ;

$.fn.render = function(view, locals) {
  return this.each(function() {
    var _locals = locals;
    if (typeof locals === 'function') {
      _locals = locals.call(this);
    }
    var html = render(view, _locals);
    $(this).html(html);
  });
};

function render(view, locals) {
  var html = browserijade(view, locals);
  return html;
}

module.exports = render;
