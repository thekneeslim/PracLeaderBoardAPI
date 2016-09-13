var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var fs = require('fs');
var methodOverride = require('method-override')

var app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// configure app to use ejs for templates
app.set('view engine', 'ejs');

// tell our server where our static files live.
var staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// HOMEPAGE
app.get("/", function(req, res) {
  var leaderBoard = getLeaderBoards();
  res.render('index', {consolLeaderBoard: leaderBoards.length});
});

// CREATE ENTRIES
app.get("/entries/new", function(req, res) {
  res.render("entries_new");
});

app.post("/entries", function(req, res) {

  // generating id and create the new entry

  var entry = {
    name: req.body.name,
    score: req.body.score,
    initial: req.body.initial
  };

  createLeaderBoard(entry);

  res.redirect("/");
})

// READ
app.get("/entries", function(req, res) {
  var leaderBoards = getLeaderBoards();
  res.render('entry_all', {entry: leaderBoards});
});

function getLeaderBoards() {
  // Load the Leader Board list from a file.
  var leaderBoardsJSON = fs.readFileSync('./entry.json');
  leaderBoards = JSON.parse(leaderBoardsJSON);
  return leaderBoards;
}

function getLeaderBoard(id) {
  var leaderBoard = getLeaderBoards();

  var entry = undefined;
  for (var i = 0; i < products.length; i++) {
    if (leaderBoard[i].id === id) {
      entry = leaderBoard[i];
    }
  }
  return entry;
}

function createLeaderBoard(newEntry) {
  var entry = getLeaderBoards();
  entry.push(newEntry);

  writeLeaderBoard(entry);
}

function writeLeaderBoard(entry) {
  var json = JSON.stringify(entry);
  fs.writeFileSync('./entry.json', json);
}
