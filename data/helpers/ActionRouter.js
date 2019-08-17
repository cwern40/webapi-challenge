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

router.get('/:id', validateActionId, (req, res) => {
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

router.post('/', validateActionInfo, (req, res) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error creating action'
            })
        })
})

router.put('/:id', validateActionId, validateActionInfo, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(update => {
            res.status(200).json(update)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "error updating action"
            })
        })
})

function validateActionId(req, res, next) {
    const { id } = req.params;

    Actions.get(id)
        .then(action => {
            if (action) {
                req.action = action
                next();
            } else {
                res.status(404).json({
                    message: 'Invalid action id'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'error processing the request'
            })
        })
}

function validateActionInfo (req, res, next) {
    if (!req.body || !Object.keys(req.body).length > 0) {
        res.status(400).json({
            message: 'missing action data'
        })
    } else if (!req.body.project_id) {
        res.status(400).json({
            message: 'missing project id field'
        })
    } else if (!req.body.description) {
        res.status(400).json({
            message: 'missing description field'
        })
    } else if (!req.body.notes) {
        res.status(400).json({
            message: 'missing notes field'
        })
    } else {
        next()
    }
}

module.exports = router;