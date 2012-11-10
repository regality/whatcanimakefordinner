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
  }
});

IngredientSchema.plugin(mongoosastic, {
  host: config.mongoosastic
});

module.exports = IngredientSchema;
