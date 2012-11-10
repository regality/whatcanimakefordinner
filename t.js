var models = require('./models')
  , Recipe = models.Recipe
  ;

var r = new Recipe({
  name: 'mac n cheese',
  description: 'ossum soss',
  cook_time_min: 11,
  prep_time_min: 12,
  number_of_servings: 100000,
  image_url: null,
  instructions: [
    { instruction: 'cook it' },
    { instruction: 'eat it' }
  ],
  ingredients: [
    {
      name: 'cheese',
      unit: 'oz',
      amount: 100,
      description: 'moar cheese'
    },
    {
      name: 'mac',
      unit: 'lb',
      amount: 10,
      description: 'macaroni'
    },
    {
      name: 'sauce',
      unit: 'ossum',
      amount: 7,
      description: 'ossum sauce'
    }
  ]
});

r.save(function(e) {
  if (e) throw e;
  process.exit();
});
