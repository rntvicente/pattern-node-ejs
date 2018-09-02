const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');
const chalk = require('chalk');

const bookRouter = express.Router();

const router = (nav) => {
  const urlDB = 'mongodb://library:librar1@ds018258.mlab.com:18258/library';
  let database;
  let db;

  bookRouter.route('/')
    .get((req, res) => {
      (async function mongo() {
        try {
          database = await MongoClient.connect(urlDB, { useNewUrlParser: true });
          db = await database.db('library');
          debug(chalk.green('Connected corretly to server.'));

          const books = await db.collection('books').find().toArray();

          res.render('bookListView', {
            books,
            title: 'Library',
            nav
          });
        } catch (error) {
          debug(chalk.red(error.stack));
        }
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      (async function mongo() {
        database = await MongoClient.connect(urlDB, { useNewUrlParser: true });
        db = await database.db('library');
        debug(chalk.green('Connected corretly to server.'));

        const { id } = req.params;
        const book = await db.collection('books').findOne({ _id: new ObjectID(id) });
        debug(book);

        res.render('bookView', {
          book,
          title: 'Library',
          nav
        });
      }());
    });

  return bookRouter;
};

module.exports = router;
