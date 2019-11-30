const express = require('express');
const consolidate = require('consolidate');
const path = require('path');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

const users = {
  vasya: {
    username: 'Vasily Pupkin',
    age: 40,
    achievements: [
      'Top performer', 'Pro-active person'
    ]
  },
  kolya: {
    username: 'Kolya Pupkin',
    achievements: [
      'Welcome'
    ]
  },
}

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if(req.headers.sample === 'value') {
    req.sample = 'Hello';
  }
  next();
});

app.use('/users', (req, res, next) => {
  console.log('middleware2');
  next();
});

app.all('/users', (req, res, next) => {
  console.log('all');
  next();
});

app.get('/users', (req, res) => {
  res.send('Hello world!');
});

app.get('/users/:username', (req, res) => {
  const user = users[req.params.username];
  res.render('user', user);
});

app.post('/users', (req, res) => {
  console.log(req.sample);
  res.send('OK');
});

app.post('/settings', (req, res) => {
  console.log(req.body);
  res.render('user', {});
});

app.listen(3000, () => {
  console.log('Server has been started!');
});