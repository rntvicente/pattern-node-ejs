const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');
const chalk = require('chalk');

const adminRouter = express.Router();

const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Misérables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
  },
  {
    title: 'A Journey into the Center of the Earth',
    genre: 'Science Fiction',
    author: 'Jules Verne',
    read: false
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
  },
  {
    title: 'Life On The Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
  },
  {
    title: 'Childhood',
    genre: 'Biography',
    author: 'Lev Nikolayevich Tolstoy',
    read: false
  }
];

const router = () => {
  adminRouter.route('/')
    .get((req, res) => {
      const urlDB = 'mongodb://library:librar1@ds018258.mlab.com:18258/library';

      (async function mongo() {
        let database;

        try {
          database = await MongoClient.connect(urlDB, { useNewUrlParser: true });
          debug(chalk.green('Connected corretly to server.'));

          const result = await database.db('library').collection('books').insertMany(books);

          res.json(result);
        } catch (error) {
          debug(chalk.red(error.stack));
        }

        database.close();
      }());
    });

  return adminRouter;
};

module.exports = router;
