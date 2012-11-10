var config = require('../config')
  , OAuth = require('client-oauth')
  , scraper = require('scraper')
  , log = require('../log')
  , fatSecret = new OAuth[1.0]({
      base: 'http://platform.fatsecret.com/rest/server.api',
      key:    config.fatSecret.key,
      secret: config.fatSecret.secret
    }).Client()
  ;


exports.getRecipe = function getRecipe(recipeId, cb) {

  var req = {
    'method': 'recipe.get',
    'recipe_id': recipeId.toString(),
    'oauth_token': null,
    'format': 'json'
  };

  fatSecret.get('', req, function(err, data, response) {
    if(err) return cb(err);
    var obj = JSON.parse(data);
    if(obj.error) return cb(obj);

    return cb(null, obj);
  });
}

exports.recipeSearch = function recipeSearch(searchField, page, cb) {
  if(typeof page == 'function') {
    cb = page;
    page = 0;
  }
  var req = {
    'method': 'recipes.search',
    'search_expression': searchField,
    'oauth_token': null,
    'format': 'json',
    'page_number': page,
    'max_results':  50
  };

  fatSecret.get('', req, function(err, data, response) {
    if(err) return cb(err);
    var obj = JSON.parse(data);
    if(obj.error) return cb(obj);

    return cb(null, obj);
  });
}
