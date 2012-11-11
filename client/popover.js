function popover(id, name, ingredients) {
  var listedIngredientsObj = require('./typeahead')
  var listedIngredients = [];
  var $ = this.$;
  var _id = "." + id;
  var htmlIngredients = '<ul>'

  for(key in listedIngredientsObj.used) {
    listedIngredients.push(key);
  }
  console.log(listedIngredients);

  for(var i = 0; i < ingredients.length; i++) {
    var tmp = '<li>';
    console.log(ingredients[i].name);
    if(listedIngredients.indexOf(ingredients[i].name) != -1) {
      tmp = tmp.concat('<i class="icon-ok"></i>');
    } else {
      tmp = tmp.concat('<i class="icon-asterisk"></i>');
    }
    tmp = tmp.concat("&nbsp;&nbsp;" +ingredients[i].description + '</li>');
    htmlIngredients = htmlIngredients.concat(tmp);
  }
  htmlIngredients = htmlIngredients.concat('</ul>');
  $(_id).popover({
    html: true,
    placement: 'left',
    trigger: 'hover',
    title: name,
    content: htmlIngredients
  });
}

module.exports = popover;
