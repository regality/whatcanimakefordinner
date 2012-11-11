"use strict";

var $             = require('jquery-browserify')
  , render        = require('./render')
  , ingredients   = require('./typeahead')
  ;

ingredients.on('new', function() {
  var recipesArr = []
    , recipes = {};
  for (var i in ingredients.used) {
    recipesArr = recipesArr.concat(ingredients.used[i].recipes);
  }
  recipesArr.sort();
  for (var i = 0; i < recipesArr.length; ++i) {
    var id = recipesArr[i];
    if (recipes[id]) {
      recipes[id] = recipes[id] + 1;
    } else {
      recipes[id] = 1;
    }
  }
  var ordered = [];
  for (var id in recipes) {
    ordered.push({
      id: id,
      count: recipes[id]
    });
  }
  ordered.sort(function(a, b) {
    return b.count - a.count;
  });
  var topRecipes = ordered.slice(0, 20);
  loadRecipes(topRecipes);
});

function loadRecipes(recipes) {
  var ids = recipes.map(function(v) {
    return v.id;
  }).join(',');

  $.ajax({
    url: '/recipes/get',
    data: { ids: ids },
    success: function(data) {
      $('#search-results').html('');
      for (var i = 0; i < data.length; ++i) {
        data[i].image_url = data[i].image_url || null;
        var html = render('search-result', data[i]);
        $('#search-results').append(html);
      }
    }
  });
}
