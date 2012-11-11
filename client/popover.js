function popover(id, name, ingredients) {
  var render = require('./render');
  var listedIngredientsObj = require('./typeahead');
  var listedIngredients = [];
  var $ = this.$;
  var _id = "." + id;
  for(key in listedIngredientsObj.used) {
    listedIngredients.push(key);
  }
  var htmlIngredients = render('popover', {
    listedIngredients: listedIngredients,
    ingredients: ingredients
  })

  name = '<h4>' + name + '</h4>';

  $(_id).popover({
    html: true,
    placement: 'left',
    trigger: 'hover',
    title: name,
    content: htmlIngredients
  });
}

module.exports = popover;
