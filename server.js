'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/books.js');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected');
});
mongoose.connect(process.env.DB_URL);


const app = express();
app.use(cors());

app.use(express.json());


const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('Book Found!')
});

app.get('/books', getBooks);
app.post('/books', postBook);
app.delete('/books/:id', deleteBook);
app.put('/books/:id', putBook)


async function getBooks(req, res, next) {
  try {
    let results = await Book.find({});
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

async function postBook(req, res, next) {
  console.log(req.body);
  try {
    let createdBook = await Book.create(req.body);
    res.status(200).send(createdBook);
  } catch(err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    let id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.status(200).send('Book deleted');
  } catch(err) {
    next(err);
  }
}

async function putBook(req, res, next) {
  try {
    let id = req.params.id;
    let updatedBook = req.body;
    let bookFromDatabase = await Book.findByIdAndUpdate(id, updatedBook, { new: true, overwrite: true });
    res.status(200).send(bookFromDatabase);
  } catch(err) {
    next(err);
  }
}

app.get('/test', (request, response) => {
  response.send('test request received')
})

app.get('*', (request, response) => {
  response.status(404).send('Book NOT Found!')
});

app.use((error, request, response, next) => {
  response.status(500).send('Error');
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));
