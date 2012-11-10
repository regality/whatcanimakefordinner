require('./bootstrap.js');

$("input#search").typeahead({
  source: searchIngredient,
  items: 10,
  minLength: 1,
  matcher: function() {
    return true;
  },
  highlighter: function(item) {
    return item.name;
  },
  sorter: function(items) {
    return items;
  },
  updater: function(item) {
    item = JSON.parse(item);
    $("#ingredient-list").append(item.name + '<br/>')
    return '';
  }
});

function searchIngredient(query, cb) {
  $.ajax({
    url: '/search/ingredient',
    data: {
      q: query
    },
    success: function(data) {
      //var results = data.results.map(function(v) { return v.name; });
      for (var i = 0; i < data.results.length; ++i) {
        data.results[i].toString = function() {
          return JSON.stringify(this);
        }
      }
      cb(data.results);
    }
  });
}
