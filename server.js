'use strict';
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { DATABASE_URL, PORT } = require('./config');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
const app = express();
const beerRouter = require('./beerRouter');
const recentRouter = require('./recentRouter');

app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

app.use(morgan('common'));
app.use(express.json());

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use('/beer', beerRouter);
app.use('/recent', recentRouter);

app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
let server;

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchronously starting
// our server, since we'll be dealing with promises there.
function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
      mongoose.connect(DATABASE_URL, err => {
          if (err) {
              return reject(err);
          }
      server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
      })
      .on('error', err => {
          mongoose.disconnect();
          reject(err);
      });
    });
  });
}
// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        server.close(err => {
          if (err) {
            return reject(err);
          }
        resolve();
      });
    });
  });
}
// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };