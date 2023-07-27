const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();
const { deathValley, mawsynram, denali } = require('./data.js');

app.locals = {
  title: 'Weathrly Network (Requests)',
  deathValley,
  mawsynram,
  denali
}

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/v1/death-valley', (req, res) => {
  res.status(200).json(app.locals.deathValley);
});

app.get('/api/v1/mawsynram', (req, res) => {
  res.status(200).json(app.locals.mawsynram);
});

app.get('/api/v1/denali', (req, res) => {
  res.status(200).json(app.locals.denali);
});

app.post('/api/v1/:location',(req, res) => {
  if (req.params.location === 'death-valley') {
    app.locals.deathValley.announcements = {
      warning: true,
      message: req.body.message
    }
  } else {
    app.locals[req.params.location].announcements = {
      warning: true,
      message: req.body.message
    }
  }
  console.log(app.locals)

  return res.status(201).json({ message: req.body.message })
})

app.delete('/api/v1/:location', (req, res) => {
  if (req.params.location === 'death-valley') {
    app.locals.deathValley.announcements = {
      warning: false,
      message: ''
    }
  } else {
    app.locals[req.params.location].announcements = {
      warning: false,
      message: ''
    }
  }
  return res.status(200).json({})
})

app.listen(port, () => {
  console.log(`${app.locals.title} is now running on http://localhost:${port} !`)
});