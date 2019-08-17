const express = require('express')

const router = express.Router();

const Projects = require('./projectModel')

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error retrieving the list of projects'
            })
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    const { id } = req.params

    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error retrieving project'
            })
        })
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error creating project'
            })
        })
})

router.put('/:id', validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
        .then(update => {
            res.status(200).json(update)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error updating user'
            })
        })
})

function validateProjectId(req, res, next) {
    const { id } = req.params;

    Projects.get(id)
        .then(project => {
            if (project) {
                req.project = project
                next();
            } else {
                res.status(404).json({
                    message: 'Invalid project id'
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

module.exports = router;