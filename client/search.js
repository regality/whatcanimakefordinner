"use strict";

var $      = require('jquery-browserify')
  , render = require('./render')

var lastval;
$('input#search').on('keyup', function(e) {
  var $results = $("#search-results");
  $results.html('');
  var $this = $(this);
  var val = $this.val();
  if (!val) return;
  if (val === lastval) return;
  lastval = val;
  $.ajax({
    url: '/search',
    data: {
      q: val
    },
    success: function(data) {
      data.results.forEach(function(item) {
        var html = render('search-result', {
          name: item.name,
          description: item.description
        });
        $results.append(html);
      });
    }
  });
});
