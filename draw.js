var fs = require('fs'),
  readline = require('readline'),
  path = require('path');

var entries = path.join(__dirname, 'entries.csv');

var rd = readline.createInterface({
  input: fs.createReadStream(entries),
  output: process.stdout,
  terminal: false
});

var results = []
rd.on('line', function(line) {
  var matches = line.match(/(.*),\s*(\d*)/);
  name = matches[1];
  count = matches[2];

  for (var i = 0; i < count; i++){
    results.push(name);
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

rd.on('close', function() {
  winners = {}

  while(Object.keys(winners).length < 4){
    var pick = getRandomInt(0, results.length - 1);
    var newWinner = results[pick];

    winners[newWinner] = 1; 
  }

  console.log(winners);
});
