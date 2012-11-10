var models = require('./models')
  , Ingredient = models.Ingredient
  ;


var stream = Ingredient.find().stream()
  , total = 0
  , count = 0
  , done = false
  ;

stream.on('data', function(doc){
  total++;
  count++;
  console.log('fixing doc ' + total);
  doc.name = doc.name.replace(/\(.*\)/, '').trim();
  doc.save(function(err) {
    if (err) console.log(err);
    if (err && err.code == 11001) {
      doc.remove(function() {
        count--;
        allDone();
      });
    } else {
      count--;
      allDone();
    }
  });
});

stream.on('close', function() {
  done = true;
  allDone();
});

stream.on('error', function(err){
  throw err;
});

function allDone() {
  if (count > 0) return;
  if (!done) return;
  console.log('fixed ' + total + ' documents!');
  process.exit(0);
}

