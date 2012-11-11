"use strict";

var mongoose   = require('mongoose')
  , models     = require('../models')
  , Recipe     = models.Recipe
  , Ingredient = models.Ingredient
  , ObjectId   = mongoose.Types.ObjectId
  ;

exports.init = function(app) {
  app.get('/', index);
  app.get('/add', addRecipe);
  app.post('/add', createRecipe);
  app.get('/recipes/get', getRecipes);
  app.get('/search/ingredient', searchIngredient);
  app.get('/details/:id', recipeDetails);
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

function getRecipes(req, res, next) {
  var ids = req.query.ids.split(',').map(function(id) {
    return { _id: ObjectId(id) }
  });
  Recipe.find({$or: ids}, function(err, docs) {
    if (err) return next(err);
    var ids = req.query.ids.split(',');
    docs.sort(function(a, b) {
      return ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString());
    });
    res.json(docs);
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

function sortByFrequencyAndRemoveDuplicates(array) {
  var frequency = {}, value;

  // compute frequencies of each value
  for(var i = 0; i < array.length; i++) {
    value = array[i];

    if(value in frequency) frequency[value]++;
    else frequency[value] = 1;
  }

  // make array from the frequency object to de-duplicate
  var uniques = [];
  for(value in frequency) {
    uniques.push(value);
  }

  // sort the uniques array in descending order by frequency
  function compareFrequency(a, b) {
    return frequency[b] - frequency[a];
  }

  return uniques.sort(compareFrequency);
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

function recipeDetails(req, res, next) {
  Recipe.find({_id: req.params.id}, function(err, docs) {
    if(err) return res.send(500, err);
    res.render('details', {recipe: docs[0]});
  });
}
