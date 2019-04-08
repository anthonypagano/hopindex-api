'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {Beer} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const should = chai.should();

chai.use(chaiHttp);

function seedEntryData() {
  console.info('seeding beers data');
  const seedData = [
    { beerName: "Heavy Boots Of Lead", style: "Stout", abv: "11", brewery: "Singlecut Beersmiths", rating: "5", cityState: "Astoria, NY", notes: "barrel aged version is much better"},
    { beerName: "Bon Bon 2x TNT", style: "IIPA", abv: "8", brewery: "Singlecut Beersmiths", rating: "5", cityState: "Astoria, NY", notes: "named after the late AC-DC singer"},
    { beerName: "Softly Spoken Magic Spells", style: "IIPA", abv: "8.5", brewery: "Singlecut Beersmiths", rating: "5", cityState: "Astoria, NY", notes: "double dry hopped version"},
    { beerName: "Sumner", style: "Pale Ale", abv: "4.5", brewery: "Hill Farmstead", rating: "5", cityState: "Greensboro Bend, VT", notes: "a favorite pale ale"},
    { beerName: "Kentucky Breakfast Stout", style: "Stout", abv: "12.2", brewery: "Founders Brewing Company", rating: "4", cityState: "Grand Rapids, MI", notes: "barrel aged in a cave"},
    { beerName: "Bourbon County Stout", style: "Stout", abv: "15", brewery: "Goose Island Brewing Company", rating: "5", cityState: "Chicago, IL", notes: "a black friday tradition"},
  ];

  return Beer.insertMany(seedData);
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe("The Hop Index app", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function () {
    return seedEntryData();
  });

  afterEach(function () {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

describe('Endpoint Tests', function(){

  it('Should return index.html', function () {
    return chai.request(app)
      .get('/')
      .then(function(res) {
          res.should.be.html;
      });
  });   
  
  it('should return all beers', function() {
    let res;
    return chai.request(app)
      .get('/beer')
      .then(_res => {
        res = _res;
        res.should.have.status(200);
        res.body.should.have.lengthOf.at.least(1);
  
        return Beer.countDocuments();
      })
      .then(count => {
        res.body.should.have.lengthOf(count);
      });
  });    

  it('should return 5 most recent beers tried', function() {
    let res;
    return chai.request(app)
      .get('/recent')
      .then(_res => {
        res = _res;
        res.should.have.status(200);
        res.body.should.have.lengthOf.at.least(5);
      })
  });

  it('should add a new beer', function() {

    const newBeer = {
      beerName: "Whammy",
      style: "IIPA",
      abv: "8.0",
      brewery: "Singlecut Beersmiths",
      rating: "4",
      cityState: "Astoria, NY",
      notes: "named after Press Your Luck"
    };

    return chai.request(app)
    .post('/beer')
    .send(newBeer)
    .then(function (res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.include.keys('id', 'beerName', 'style', 'abv', 'brewery', 'rating', 'cityState', 'notes');
      // cause Mongo should have created id on insertion
      res.body.id.should.not.be.null;
      res.body.beerName.should.equal(newBeer.beerName);
      res.body.style.should.equal(newBeer.style);
      res.body.abv.should.equal(newBeer.abv);
      res.body.brewery.should.equal(newBeer.brewery);
      res.body.rating.should.equal(newBeer.rating);
      res.body.cityState.should.equal(newBeer.cityState);
      res.body.notes.should.equal(newBeer.notes);
      return Beer.findById(res.body.id);
    })
    .then(function (post) {
      post.beerName.should.equal(newBeer.beerName);
      post.style.should.equal(newBeer.style);
      post.abv.should.equal(newBeer.abv);
      post.brewery.should.equal(newBeer.brewery);
      post.rating.should.equal(newBeer.rating);
      post.cityState.should.equal(newBeer.cityState);
      post.notes.should.equal(newBeer.notes);
    });
  });

  it('delete a beer by id', function() {

    let beer;

    return Beer
        .findOneAndDelete()
        .then(_beer => {
        beer = _beer;
        return chai.request(app).delete(`/beer/${beer.id}`);
        })
        .then(res => {
        res.should.have.status(200);
        return Beer.findById(beer.id);
        })
    });

  });
});