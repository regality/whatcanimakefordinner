var $ = require('jquery-browserify');

window.require = require;
window.jQuery = $;
window.$ = $;

$(function() {
  require('./typeahead');
  require('./search');
  require('./popover');
});
