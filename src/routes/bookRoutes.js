const express = require('express');

const bookController = require('../controllers/bookController');
const goodreadsService = require('../services/good-reads-service');

const bookRouter = express.Router();

const router = (nav) => {
  const { getIndex, getById, middleware } = bookController(goodreadsService, nav);
  bookRouter.use(middleware);

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
};

module.exports = router;
