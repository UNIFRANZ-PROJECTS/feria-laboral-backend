const express = require('express');
const roomRouter = express.Router();

const rooms = [
    {
        id: 1,
        name: 'GENERAL'
    },
    {
        id: 2,
        name: 'SPORTS'
    },
    {
        id: 3,
        name: 'GAMES'
    },
]

// route for get rooms
roomRouter.get('/', (req,res) => {
    console.log('romssssss')
    res.send(rooms)
})

module.exports = roomRouter