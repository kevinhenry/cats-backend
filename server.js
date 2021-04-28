const express = require('express');
const app = express();
const mongoose = require('mongoose');

// hey mongoose, connect to the database at localhost:27017
mongoose.connect('mongodb://localhost:27017/coolcat', {useNewUrlParser: true, useUnifiedTopology: true});

// I'm intentioanlly equiring this moeld After I run mongoose.connect
const Cat = require('./models/Cat');

// see the database with some cats, so I can retrieve them
const myCat = new Cat({
  name: 'softy',
  color: 'black',
  hasClaws: false,
  favoriteActivities: [
    {activityName: 'playing with a ball of yarn'},
    {activityName: 'sleeping'},
    {activityName: 'zoomies'},
  ]
});
myCat.save(function (err) {
  if (err) console.err (err);
  else console.log('saved the cat');
});

app.get('/', (req, res) => {
  res.send('hello, cool cat!');
});

app.get('/cats', (req, res) => {
  // get all the cats from the database
  Cat.find((err, databaseResults) => {
    // send them in my response
    res.send(databaseResults);
  });
});

// route to get just one cat
app.get('/cat', (req, res) => {
  Cat.find({name: req.query.name}, (err, databaseResults) => {
    // sent them in my response
    res.send(databaseResults);
  });
});

app.listen(3001, () => console.log('app listening on 3001'));
