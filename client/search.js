"use strict";

var $       = require('jquery-browserify')
  , render  = require('./render')
  , counter = 1
  , timer   = null
  , lastval
  ;

$('input#search').on('keyup', function(e) {
  var $results = $("#search-results");
  var $this = $(this);
  var val = $this.val();
  if (!val) return;
  if (val === lastval) return;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  lastval = val;
  var c = ++counter;
  timer = setTimeout(makeRequest, 300);

  function makeRequest() {
    timer = null;
    $.ajax({
      url: '/search',
      data: {
        q: val
      },
      success: onSuccess
    });
  }

  function onSuccess(data) {
    if (counter > c) return; // we are too late
    $results.html('');
    data.results.forEach(function(item) {
      var html = render('search-result', {
        name: item.name,
        description: item.description,
        image_url: item.image_url
      });
      $results.append(html);
    });
  }

});
