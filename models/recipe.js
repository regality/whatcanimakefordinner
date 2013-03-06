"use strict";

var mongoose     = require('mongoose')
  , mongoosastic = require('mongoosastic')
  , waitress     = require('waitress')
  , models       = require('./')
  , config       = require('../config')
  , Schema       = mongoose.Schema
  ;

var RecipeSchema = new Schema({
  name: String,
  description: String,
  cook_time_min: Number,
  prep_time_min: Number,
  number_of_servings: Number,
  fat_secret_id: { type: Number, unique: true, sparse: true},
  image_url: String,
  fixed: String,
  instructions: [
    {
      instruction: String
    }
  ],
  ingredients: [
    {
      name: String,
      unit: String,
      amount: Number,
      description: String
    }
  ]
});

RecipeSchema.plugin(mongoosastic, {
  host: config.mongoosastic
});

RecipeSchema.pre('save', function(next) {
  if (this.fixed === 'done') {
    var Ingredient = models.Ingredient;

    var id = this._id;
    var done = waitress(this.ingredients.length, next);
    this.ingredients.forEach(function(ingredient) {
      Ingredient.addRecipeToIngredient(ingredient.name, id, done);
    });
  } else {
    next();
  }
});

RecipeSchema.statics.fixIngredientName = function(oldName, newName, cb) {
  models.Recipe.find({}, function(err, docs) {
    if (err) return cb(err);
    cb();
    docs.forEach(function(recipe) {
      for (var i = 0; i < recipe.ingredients.length; ++i) {
        if (recipe.ingredients[i].name.replace(/\(.*\)/,'').trim() === oldName) {
          recipe.ingredients[i].name = newName;
        }
      }
      recipe.save(function(err){
        if (err) console.log(err.stack);
      });
    });
  });
}

module.exports = RecipeSchema;
