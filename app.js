const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }
];

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport')(app);

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Library',
    nav
  });

  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(port, () => {
  debug(`Listing on port ${chalk.green(port)}.`);
});
