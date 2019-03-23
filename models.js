'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const beerSchema = mongoose.Schema({
  beerName: {type: String, required: true },
  style: {type: String, required: true },
  abv: {type: String, required: true },
  brewery: {type: String, required: true },
  rating: {type: String, required: true },
  cityState: {type: String, required: true },
  notes: {type: String, required: true },
  dateAdded: {type: Date, default: Date.now }
});

beerSchema.methods.serialize = function() {
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

const Beer = mongoose.model('Beer', beerSchema);

module.exports = {Beer};
