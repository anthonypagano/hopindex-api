'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const {Beers} = require('../models');
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

  return Beers.insertMany(seedData);
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Endpoint Tests', function(){
  console.log('TEST DB IS ' + TEST_DATABASE_URL)
  it('should 200 on GET requests', function() {
    return chai.request(app)
      .get('/fooooo')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
      });
  });
  
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
        console.log('it got into the return all beers test')
        res.should.have.status(200);
        res.body.should.have.lengthOf.at.least(1);
  
        return Beers.count();
      })
      .then(count => {
        res.body.should.have.lengthOf(count);
      });
  });    
});