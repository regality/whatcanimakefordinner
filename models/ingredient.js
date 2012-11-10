"use strict";

var mongoose     = require('mongoose')
  , mongoosastic = require('mongoosastic')
  , models       = require('./')
  , config       = require('../config')
  , Schema       = mongoose.Schema
  ;

var IngredientSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  recipes: [String]
});

IngredientSchema.plugin(mongoosastic, {
  host: config.mongoosastic
});

IngredientSchema.statics.addRecipeToIngredient = function(ingredient, recipeId, cb) {
  var Ingredient = models.Ingredient;
  recipeId = recipeId.toString();
  Ingredient.findOne({name: ingredient}, function(err, doc) {
    if (err) return cb(err);
    if (!doc) {
      doc = new Ingredient({
        name: ingredient
      });
    }
    if (doc.recipes.indexOf(recipeId) === -1) {
      doc.recipes.push(recipeId);
      doc.save(function(err) {
        if (err && err.code !== 11001) {
          return Ingredient.addRecipeToIngredient(ingredient, recipeId, cb);
        }
        cb(err);
      });
    } else {
      cb();
    }
  });
}

module.exports = IngredientSchema;
