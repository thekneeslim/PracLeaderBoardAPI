var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
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

var entries = [
  {id: "dexter", name: 'Dexter', score: 30, initial: "dex"},
  {id: "denise", name: 'Denise', score: 10, initial: "dl"},
  {id: "denise", name: 'Denise', score: 10, initial: "dl"},
]

// HOMEPAGE
app.get("/", function(req, res) {
  res.json(entries);
});

// CREATE ENTRIES
app.get("/entries/new", function(req, res) {
  res.render("entries_new");
});

app.post("/entries", function(req, res) {
  var entry = {
    id: req.body.name,
    name: req.body.name,
    score: req.body.score,
    initial: req.body.initial
  };

  entries.push(entry);
  res.redirect("/entries/" + entry.id);
})

// READ
app.get("/entries", function(req, res) {
  res.render('entries_all');
});

app.get("/entries/:id", function(req, res) {
  var entry = checkArray(req.params.id);
  res.render('entries_all');
});

// UPDATE
app.put("/entries/:id", function(req, res) {
  var entry = checkArray(req.params.id);
  entry.id = req.params.id;
  entry.name = req.body.name;
  entry.score = req.body.score;
  entry.initial = req.body.initial;

  res.redirect('/');
});

// DELETE
app.delete("/entries/:id", function(req, res) {
  var entry = checkArray(req.body.id);
  deleteEntry(entry);
  res.redirect("/");
});

// ================== BREAK ==================

function checkArray(valuePassed) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].id === valuePassed) {
      return entries[i];
    }
  }
}

function deleteEntry(id) {
  entries = entries.filter(function(apple) {
    return entries.id !== id;
  })
}

app.listen(3000);
