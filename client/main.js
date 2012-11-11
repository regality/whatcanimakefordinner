var $ = require('jquery-browserify');

window.requrie = require;
window.jQuery = $;
window.$ = $;

$(function() {
  require('./typeahead');
  require('./search');
});
