var models = require('./models')
  , Ingredient = models.Ingredient
  ;

var stream = Ingredient.find().stream()
  , total = 0
  , done = false
  , queue = []
  ;

stream.on('data', function(doc){
  total++;
  queue.push(doc);
});

stream.on('close', function() {
  processQueue();
});

stream.on('error', function(err){
  throw err;
});

function processQueue() {
  if (!queue.length) process.exit(0);
  var doc = queue.pop();
  console.log(queue.length + ' left to index');
  console.log('indexing ' + doc.name);
  doc.index(function(err) {
    if (err) console.log(err);
    processQueue();
  });
}

