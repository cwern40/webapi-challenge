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

module.exports = router;