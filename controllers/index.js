"use strict";

exports.init = function(app) {
  app.get('/', index);
}

function index(req, res, next) {
  res.render('index');
};
