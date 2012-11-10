var fs = require('./fatSecret')
  , models = require('../models')
  , waitress = require('waitress')
  , Recipe = models.Recipe
  , searchStrings = ['beef', 'chicken', 'pork', 'pasta', 'breakfast', 'lunch', 'dinner']
  , index = 0
  ;

function scrapeSaveRecipe(id, cb) {
  console.log('getting recipe at id ' + id);
  fs.getRecipe(id, function(err, res) {
    var scrapedRecipe = res.recipe
      , ingredients = scrapedRecipe.ingredients.ingredient
      , instructions = scrapedRecipe.directions.direction
      , recipe = new Recipe()
      ;

    recipe.name               = scrapedRecipe.recipe_name;
    recipe.description        = scrapedRecipe.recipe_description;
    recipe.cook_time_min      = parseFloat(scrapedRecipe.cooking_time_min);
    recipe.prep_time_min      = parseFloat(scrapedRecipe.preparation_time_min);
    recipe.number_of_servings = parseFloat(scrapedRecipe.number_of_servings);
    recipe.ingredients = [];
    recipe.instructions = [];

    for(var i = 0; i < ingredients.length; i++) {
      var ingredient = ingredients[i];
      recipe.ingredients.push({
        name: ingredient.food_name.toLowerCase(),
        amount: parseFloat(ingredient.number_of_units),
        unit: ingredient.measurement_description,
        description: ingredient.ingredient_description
      });
    }
    for(var i = 0; i < instructions.length; i++) {
      var instruction = instructions[i];
      recipe.instructions.push({
        instruction: instruction.direction_description,
        number: parseInt(instruction.direction_number, 10)
      });
    }
    recipe.save(cb);
  });
}

function nextGroup() {
  fs.recipeSearch(searchStrings[index], function(err,res) {
    var recipes = res.recipes.recipe;

    var done = waitress(recipes.length, function(err) {
      index++;
      nextGroup();
    });

    for(var i = 0; i < recipes.length; i++) {
      scrapeSaveRecipe(recipes[i].recipe_id, done);
    }
  });
}

nextGroup();
