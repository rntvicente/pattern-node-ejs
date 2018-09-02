const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local-strategy');
const chalk = require('chalk');

const config = () => {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    const urlDB = 'mongodb://library:librar1@ds018258.mlab.com:18258/library';

    (async function mongo() {
      let database;

      try {
        database = await MongoClient.connect(urlDB, { useNewUrlParser: true });
        debug(chalk.green('Connected corretly to server.'));

        const user = await database.db('library')
          .collection('users')
          .finOne({ username });

        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false)
        }
      } catch (error) {
        debug(error.stack);
      }
    }());
  }));
};

module.exports = config;
