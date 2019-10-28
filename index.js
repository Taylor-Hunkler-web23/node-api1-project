// implement your API here
const express = require('express');
const db = require('./data/db.js')

const server = express();

//get users

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})


const port = 5000;
server.listen(port, () => console.log('\n=== API on port 5000 ===\n'));