"use strict";

var models     = require('../models')
  , Recipe     = models.Recipe
  , Ingredient = models.Ingredient
  ;

exports.init = function(app) {
  app.get('/', index);
  app.get('/add', addRecipe);
  app.post('/add', createRecipe);
  app.get('/search/recipe', searchRecipes);
  app.get('/search/ingredient', searchIngredient);
}

function index(req, res, next) {
  res.render('index');
};

function addRecipe(req, res, next) {
  res.render('add');
}

function createRecipe(req, res, next) {
  var recipe = updateFromInput(new Recipe, req);
  recipe.save(function(err, doc) {
    res.redirect('/')
  });
}

function updateFromInput(recipe, req) {
  recipe.name        = req.body.name;
  recipe.description = req.body.description;

  for(var i = 0; i < req.body.ingredients; i++) {
    if(recipe.ingredients && recipe.ingredients[i]) {
      recipe.ingredients[i] = req.body.ingredients[i];
    } else {
      recipe.ingredients.push(req.body.ingredients[i]);
    }
  }

  for(var i = 0; i < req.body.instructions; i++) {
    if(recipe.instructions && recipe.instructions[i]) {
      recipe.instructions[i] = req.body.instructions[i];
    } else {
      recipe.instructions.push(req.body.instructions[i]);
    }
  }
  return recipe;
}

function searchRecipes(req, res, next) {
  Recipe.search({query: req.query.q + '*'}, function(err, results) {
    if (err) return next(err);
    var hits = results.hits.hits.map(function(v) {
      var o = v._source;
      o._id = v._id;
      return o;
    });
    res.json({
      count: hits.length,
      results: hits.slice(0, 50)
    });
  });
}

function searchIngredient(req, res, next) {
  Ingredient.search({query: req.query.q + '*'}, function(err, results) {
    if (err) return next(err);
    var hits = results.hits.hits.map(function(v) {
      var o = v._source;
      o._id = v._id;
      o.name = o.name.replace(/\(.*\)/, '').trim();
      return o;
    });
    res.json({
      count: hits.length,
      results: hits.slice(0, 50)
    });
  });
}
