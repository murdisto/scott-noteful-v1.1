'use strict';

// Load array of notes
const data = require('./db/notes');
const logger = require('./middleware/logger');
const { PORT } = require('./config');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();
app.use(logger);
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const { searchTerm } = req.query;
  if (searchTerm) {
    const searchResult = data.filter(item => item.title.includes(searchTerm));
    res.json(searchResult);
  }else{
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  const note = data.find( element => element.id === Number(req.params.id) );
  res.json(note);

});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
