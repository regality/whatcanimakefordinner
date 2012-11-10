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
  var Ingredient = models.Ingredient;

  var id = this._id;
  var done = waitress(this.ingredients.length, next);
  this.ingredients.forEach(function(ingredient) {
    Ingredient.addRecipeToIngredient(ingredient.name, id, done);
  });
});

module.exports = RecipeSchema;
