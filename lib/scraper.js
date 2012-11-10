var fs = require('./fatSecret')
  , models = require('../models')
  , waitress = require('waitress')
  , Recipe = models.Recipe
  , searchStrings = ['beef', 'chicken', 'pork', 'pasta', 'breakfast', 'lunch',
                     'dinner', 'mexican', 'chinese', 'thai', 'soup', 'bbq',
                     'cake', 'cookies', 'easy', 'eggs', 'fish', 'fruit', 'lamb',
                     'potatoes', 'rice', 'salmon', 'sausage', 'shrimp', 'french'
                    ]
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
    if(scrapedRecipe.cooking_time_min) recipe.cook_time_min      = parseFloat(scrapedRecipe.cooking_time_min);
    if(scrapedRecipe.preparation_time_min) recipe.prep_time_min      = parseFloat(scrapedRecipe.preparation_time_min);
    if(scrapedRecipe.number_of_servings) recipe.number_of_servings = parseFloat(scrapedRecipe.number_of_servings);
    recipe.fat_secret_id      = parseInt(scrapedRecipe.recipe_id, 10);
    if(scrapedRecipe.recipe_images) recipe.image_url = scrapedRecipe.recipe_images.recipe_image.toString().split(',')[0];

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
        instruction: instruction.direction_description
      });
    }
    recipe.save(function(err, res) {
      if(err) {
        console.log('########################');
        console.log("ERROR on " + id);
        console.log(err);
        console.log('########################');
        cb();
      } else {
        console.log('got ' + id);
        cb();
      }
    });
  });
}

function nextGroup() {
  if(index >= searchStrings.length) return setTimeout(function(){process.exit()},60000);
  fs.recipeSearch(searchStrings[index], function(err,res) {
    var recipes = res.recipes.recipe;
    console.log('found ' + recipes.length + ' for ' + searchStrings[index]);

    var done = waitress(recipes.length, function(err) {
      console.log(searchStrings[index] + ' is done');
      index++;
      nextGroup();
    });

    for(var i = 0; i < recipes.length; i++) {
      scrapeSaveRecipe(recipes[i].recipe_id, done);
    }
  });
}

nextGroup();
