const express = require('express');

const bookRouter = express.Router();

const router = (nav) => {
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

  bookRouter.route('/')
    .get((req, res) => {
      res.render('bookListView', {
        books,
        title: 'Library',
        nav
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;

      res.render('bookView', {
        book: books[id],
        title: 'Library',
        nav: [
          { link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' }
        ]
      });
    });

  return bookRouter;
};

module.exports = router;