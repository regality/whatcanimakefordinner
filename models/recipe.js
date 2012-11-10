"use strict";

var mongoose = require('mongoose')
  , models   = require('./')
  , config   = require('../config')
  , Schema   = mongoose.Schema
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

module.exports = RecipeSchema;
