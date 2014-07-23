var WINNERS = 4;

var fs = require('fs'),
  readline = require('readline'),
  path = require('path');

var entries = path.join(__dirname, 'entries3.csv');

var rd = readline.createInterface({
  input: fs.createReadStream(entries),
  output: process.stdout,
  terminal: false
});

var results = []
rd.on('line', function(line) {
  // Extremely simple csv handling, there is a name and a number of times that person has entered the competition
  // Pull that data out with a regex
  var matches = line.match(/(.*),\s*(\d*)/);
  
  if (matches){
    var name = matches[1];
    var count = matches[2];

    // One chance of selection per entry, as per the readme file
    for (var i = 0; i < count; i++){
      results.push(name);
    }
  }
  else {
    results.push(line);
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

rd.on('close', function() {
  // Check that there are enough entries to draw winners
  if results.length < WINNERS {
    console.log('Not enough entries');
    return;
  }

  var winners = {}

  while(Object.keys(winners).length < WINNERS){
    var pick = getRandomInt(0, results.length - 1);
    var newWinner = results[pick];

    winners[newWinner] = 1; 
  }

  console.log(winners);
});
