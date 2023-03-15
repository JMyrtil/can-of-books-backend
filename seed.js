'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');

async function seed() {
    await Book.create({
        title: 'Percy Jackson & the Olympians',
        description: 'Fantasy, Mythology',
        status: 'Available'
    });
    console.log('Percy Jackson & the Olympians was added');
    await Book.create({
        title: 'Goosebumps',
        description: 'Spooky',
        status: 'Not Available'
    });
    console.log('Goosebumps was added');
    await Book.create({
        title: 'Harry Potter',
        description: 'Fantasy, Magic',
        status: 'Available'
    });
    console.log('Harry Potter was added');

    mongoose.disconnect();
}

seed();