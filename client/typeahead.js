"use strict";

var events       = require('events')
  , render       = require('./render')
  , bill         = require('./bootstrap.js')
  , EventEmitter = events.EventEmitter
  , ingredients  = new EventEmitter()
  ;

ingredients.ingredients = {};
ingredients.used = {};

$("input#search").typeahead({
  source: searchIngredient,
  items: 20,
  minLength: 1,
  matcher: function() {
    return true;
  },
  highlighter: function(item) {
    return item;
  },
  sorter: function(items) {
    return items;
  },
  updater: function(item) {
    var html = render('ingredient', {
      name: item
    });
    $("#ingredient-list").append(html);
    ingredients.used[item] = ingredients.ingredients[item]
    ingredients.emit('new');
    return '';
  }
});

function searchIngredient(query, cb) {
  $.ajax({
    url: '/search/ingredient',
    data: { q: query },
    success: onSuccess
  });

  function onSuccess(data) {
    var names = data.results.map(function(v) {
      ingredients.ingredients[v.name] = v;
      return v.name;
    });
    cb(names);
  }

}

module.exports = ingredients;
