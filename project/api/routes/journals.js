const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Journal = require('../models/journal_model');

router.get('/', (req, res, next) => {
    Journal.find()
        // .select('_id name price')
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                journals: docs.map(doc => {
                    return {
                        journal: doc,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/journals/" + doc._id
                        }
                    }
                })
            }
            // if (docs.length >= 0) {
                res.status(200).json(response);
            // } else {
            //     res.status(404).json({
            //         message: 'No entries found'
            //     });
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const journal = new Journal({
        _id: new mongoose.Types.ObjectId(),
        p1: req.body.p1,
        p2: req.body.p2,
        p3: req.body.p3,
        p4: req.body.p4,
        p5: req.body.p5,
        p6: req.body.p6,
        mood: req.body.mood,
        date: req.body.date
    });
    journal
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Created journal successfully',
                createdJournal: {
                    p1: result.p1,
                    p2: result.p2,
                    p3: result.p3,
                    p4: result.p4,
                    p5: result.p5,
                    p6: result.p6,
                    mood: result.mood,
                    _id: result.id
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/journals/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:journalID', (req, res, next) => {
    const id = req.params.journalID;
    Journal.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            res.status(200).json({
                journal: doc,
                request: {
                    type: 'GET',
                    description: 'Get all journals',
                    url: 'http://localhost:3000/journals'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:journalID', (req, res, next) => {
    const id = req.params.journalID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Journal.updateOne({ _id: id}, {$set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Journal updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/journals/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:journalID', (req, res, next) => {
    const id = req.params.journalID;
    Journal.deleteOne({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Journal deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/journals',
                    body: { _id: id }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;
