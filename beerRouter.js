const express = require('express');
const router = express.Router();

const { Beer } = require('./models');

//get all the beers in the db
router.get('/', (req, res) => {
    Beer
        .find()
        .then(beers => {
            res.json(beers.map(beer => beers.serialize()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: '500 Server Error' });
        });
    });

//get a beer by a specific id
router.get('/:id', (req, res) => {
    Beer
        .findById(req.params.id)
        .then(beers => res.json(beers.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: '500 Server Error' });
        });
    });

//add a new beer to the db
router.post('/', (req, res) => {
    console.log(req);
    const requiredFields = ['beerName', 'style', 'abv', 'brewery', 'rating', 'cityState', 'notes'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
            if (!(field in req.body)) {
                const message = `Missing \`${field}\` in request body`;
                    console.error(message);
                return res.status(400).send(message);
            }
        }

Beer
    .create({
        beerName: req.body.beerName,
        style: req.body.style,
        abv: req.body.abv,
        brewery: req.body.brewery,
        rating: req.body.rating,
        cityState: req.body.cityState,
        notes: req.body.notes
    })
    .then(beer => res.status(201).json(beer.serialize()))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    });
});

//delete a beer by id
router.delete('/:id', (req, res) => {
    Beer
        .findByIdAndRemove(req.params.id)
        .then(() => {
            console.log(`Deleted beer with id \`${req.params.id}\``);
            res.status(204).end();
        });
    });

module.exports = router;