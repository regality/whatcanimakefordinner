"use strict";

var $       = require('jquery-browserify')
  , render  = require('./render')
  , counter = 1
  , timer   = null
  , lastval
  ;

$('input#search').on('keyup', function(e) {
  if(e.keyCode != 13) return;
  var $results = $("#search-results");
  var $this = $(this);

  setTimeout(makeRequest, 20);

  function makeRequest() {
    var ingredients = $("#ingredient-list").html().toString().split('<br>');
    ingredients.pop();
    $.ajax({
      url: '/search/recipe',
      data: {
        ingredients: ingredients
      },
      success: onSuccess
    });
  }

  function onSuccess(data) {
    $results.html('');
    data.results.forEach(function(item) {
      var html = render('search-result', {
        name: item.name,
        description: item.description,
        image_url: item.image_url,
        _id: item._id
      });
      $results.append(html);
    });
  }

});
