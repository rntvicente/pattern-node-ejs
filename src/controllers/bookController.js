const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');
const chalk = require('chalk');

const bookController = (service, nav) => {
  const urlDB = 'mongodb://library:librar1@ds018258.mlab.com:18258/library';
  let database;
  let db;

  const getIndex = (req, res) => {
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
  };

  const getById = (req, res) => {
    (async function mongo() {
      database = await MongoClient.connect(urlDB, { useNewUrlParser: true });
      db = await database.db('library');
      debug(chalk.green('Connected corretly to server.'));

      const { id } = req.params;
      const book = await db.collection('books').findOne({ _id: new ObjectID(id) });
      debug(book);

      book.details = await service.getBookById(book.bookId);

      res.render('bookView', {
        book,
        title: 'Library',
        nav
      });
    }());
  };

  const middleware = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  };

  return { getIndex, getById, middleware };
};

module.exports = bookController;
