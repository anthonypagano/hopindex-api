'use strict';
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

const { DATABASE_URL, PORT } = require('./config');

const app = express();
const beerRouter = require('./beerRouter');
const recentRouter = require('./recentRouter');

app.use(morgan('common'));
app.use(express.json());

app.use(express.static('public'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.use('/beer', beerRouter);
app.use('/recent', recentRouter);

// `server` declared here for runServer and closeServer
let server;

// starts server and returns a Promise we need a way of asynchronously 
// starting our server for tests since promises are used there.
function runServer(DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
      mongoose.connect(DATABASE_URL, 
        { useNewUrlParser: true }, 
        err => {
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
// `server.close` does not return a promise on its manually created
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
// run this block if node server.js is called 
// runServer command exported so other code / tests can start server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };