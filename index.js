var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var fs = require('fs');
var methodOverride = require('method-override')

var app = express();

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

var staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

app.use(bodyParser.json());
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

var id = "EX000" + leaderBoards.length;
  // create the new entry
  var entry = {
    id: id,
    name: req.body.name,
    score: req.body.score,
    initial: req.body.initial
  };

  createEntry(entry);

  res.redirect("/entries/" + entry.id);
})

// READ
app.get("/entries", function(req, res) {
  var leaderBoards = getLeaderBoards();
  res.render('entry_all', {entry: leaderBoards});
});

app.get("/entries/:id", function(req, res) {
  var entry = getLeaderBoard(req.params.id);
  res.json(entry);
});

// UPDATE (this route accept info from the HTML form)
app.put("/entries/:id", function(req, res) {
  var entry = getLeaderBoard(req.params.id);
  entry.id = req.params.id;
  entry.name = req.body.name;
  entry.score = req.body.score;
  entry.initial = req.body.initial;

  editEntry(entry);

  res.redirect('/entries/' + entry.id);
});

// DELETE
app.delete("/entries/:id", function(req, res) {
  deleteEntry(req.params.id);
  res.redirect("/entries");
});


// ================== BREAK ==================

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

function createEntry(newEntry) {
  var entry = getLeaderBoards();
  entry.push(newEntry);

  writeLeaderBoard(entry);
}

function writeLeaderBoard(entry) {
  var json = JSON.stringify(entry);
  fs.writeFileSync('./entry.json', json);
}

function editEntry(updatedInfo) {
  var entry = getLeaderBoards();

  var leaderBoard = undefined;
  for (var i = 0; i < entry.length; i++) {
    if (entry[i].id === updatedInfo.id) {
      entry[i] = updatedInfo;
    }
  }
  writeLeaderBoard(entry);
}

function deleteEntry(id) {
  var entry = getLeaderBoards();
  entry = entry.filter(function(entries) {
  return entries.id !== id;
  })
writeProducts(entry);
}
app.listen(3000);
