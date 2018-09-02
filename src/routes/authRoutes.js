const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const chalk = require('chalk');
const passport = require('passport');

const authRouter = express.Router();

const router = (nav) => {
  authRouter.route('/signUp').post((req, res) => {
    const urlDB = 'mongodb://library:librar1@ds018258.mlab.com:18258/library';
    const { username, password } = req.body;

    (async function addUser() {
      let database;

      try {
        database = await MongoClient.connect(urlDB, { useNewUrlParser: true });
        debug(chalk.green('Connected corretly to server.'));

        const user = { username, password };

        const result = await database.db('library')
          .collection('users')
          .insertOne(user);

        req.login(result.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (error) {
        debug(error);
      }
    }());
  });

  authRouter.route('/signin').get((req, res) => {
    res.render('signin', {
      nav,
      title: 'Sign In'
    });
  }).post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureRedirect: '/'
  }));

  authRouter.route('/profile').get((req, res) => {
    const { user } = req;
    debug(`profile = ${JSON.stringify(user)}`);
    res.json(user);
  });

  return authRouter;
};

module.exports = router;
