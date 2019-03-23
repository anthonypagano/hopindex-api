'use strict';
const express = require('express');
const router = express.Router();

const { Beer } = require('./models');

//get the 5 most recently entered beers
router.get('/', (req, res) => {
    Beer
        .find().sort({dateAdded: -1}).limit(5)
        .then(beers => {
            res.json(beers.map(beer => beer.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: '500 Server Error' });
        });
    });

module.exports = router;