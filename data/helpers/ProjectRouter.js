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

router.get('/:id', (req, res) => {
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

module.exports = router;