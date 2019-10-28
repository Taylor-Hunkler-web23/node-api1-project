// implement your API here
const express = require('express');
const db = require('./data/db.js')

const server = express();

server.use(express.json());//middleware

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

//returns user with specified id

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log('error', err);
            res.status(404).json({  error: "The user with the specified ID does not exist." })
        })
})


//post

server.post('/api/users', (req, res) => {
   
    const {name, bio} =req.body;
    if (!name || !bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    } else {
     db.insert(req.body)
      
        .then(user=>{
            res.status(201).json(user);
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "There was an error while saving the user to the database"  })
        })
    }
})

const port = 5000;
server.listen(port, () => console.log('\n=== API on port 5000 ===\n'));