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
            if (user){
            res.status(200).json(user);
            }else{
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})


//post

server.post('/api/users', (req, res) => {

    const { name, bio } = req.body;
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.insert(req.body)

            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                console.log('error', err);
                res.status(500).json({ error: "There was an error while saving the user to the database" })
            })
    }
})


//delete
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)

        .then(removed => {
            if (removed) {
                res.status(200).json({ message: 'Deleted' });

            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }

        })
        .catch(err => {
            console.log('error', err);
            res.status(404).json({ error: "The user could not be removed" })
        })
})

//put
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, bio } = req.body;

    db.remove(id)
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        db.update(id, req.body)
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." });
                }

            })
            .catch(err => {
                console.log('error', err);
                res.status(404).json({ error: "The user could not be removed" })
            })
    }
});


const port = 5000;
server.listen(port, () => console.log('\n=== API on port 5000 ===\n'));