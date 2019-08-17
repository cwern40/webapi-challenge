const express = require('express')

const ProjectRouter = require('./data/helpers/ProjectRouter')
const ActionRouter = require('./data/helpers/ActionRouter')

const server = express()

server.use(express.json())
server.use('/api/project', ProjectRouter);
server.use('/api/action', ActionRouter);

server.get('/', (req, res) => {
    res.send('testing')
})

module.exports = server;