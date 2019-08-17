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

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
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

router.post('/', validateProjectInfo, (req, res) => {
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

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(remove => {
            res.status(200).json({
                message: `${remove} project(s) was removed`
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error removing the project'
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

function validateProjectInfo (req, res, next) {
    if (!req.body || !Object.keys(req.body).length > 0) {
        res.status(400).json({
            message: 'missing project data'
        })
    } else if (!req.body.name) {
        res.status(400).json({
            message: 'missing name field'
        })
    } else if (!req.body.description) {
        res.status(400).json({
            message: 'missing description field'
        })
    } else {
        next()
    }
}

module.exports = router;