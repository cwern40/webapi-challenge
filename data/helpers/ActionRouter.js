const express = require('express');

const router = express.Router();

const Actions = require('./actionModel')

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error retrieving actions'
            })
        })
})

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error retrieving action'
            })
        })
})

module.exports = router;