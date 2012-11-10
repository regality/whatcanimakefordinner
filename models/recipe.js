"use strict";

var mongoose     = require('mongoose')
  , mongoosastic = require('mongoosastic')
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
  image: String,
  instructions: [
    {
      instruction: String,
      number: Number
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

module.exports = RecipeSchema;
