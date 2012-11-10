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
  instructions: [
    {
      instruction: String
    }
  ],
  ingredients: [
    {
      name: String,
      unit: String,
      amount: Number
    }
  ]
});

RecipeSchema.plugin(mongoosastic, {
  host: config.mongoosastic
});

module.exports = RecipeSchema;
