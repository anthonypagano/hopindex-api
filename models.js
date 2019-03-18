'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const beersSchema = mongoose.Schema({
  beerName: {type: String, required: true },
  style: {type: String, required: true },
  abv: {type: String, required: true },
  brewery: {type: String, required: true },
  cityState: {type: String, required: true },
  notes: {type: String, required: true },
  dateAdded: {type: Date, default: Date.now }
});

beersSchema.methods.serialize = function() {
  return {
    id: this._id,
    beerName: this.beerName,
    style: this.style,
    abv: this.abv,
    brewery: this.brewery,
    rating: this.rating,
    cityState: this.cityState,
    notes: this.notes,
    dateAdded: this.dateAdded
  };
};

const Beers = mongoose.model('Beers', beersSchema);

module.exports = {Beers};
