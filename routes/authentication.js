const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// uses the public folder in the app
app.use(express.static(__dirname + '/public/css'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// My database
const users = [
  { username: 'user1', password: 'password' },
  { username: 'user2', password: 'password' }
];

// Middleware check for authentication
const requireAuth = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next();
  }
  res.redirect('/');
};

// Middleware to redirect to loggedin page if user is already authenticated
const redirectIfAuthenticated = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    res.redirect('/loggedin');
  } else {
    return next();
  }
};

app.get('/', redirectIfAuthenticated, (req, res) => {
  const username = req.session.username || '';
  const user = req.session.authenticated ? username : 'not logged in';
  res.render('login', { error: req.query.error, username: username, user: user });
});

// New route for module builder
app.get('/modulebuilder', requireAuth, (req, res) => {
  const username = req.session.username || '';
  const user = req.session.authenticated ? username : 'not logged in';
  res.render('moduleBuilder', { username: username, user: user });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // If the user is authenticated, set a session variable and redirect them to the authenticated page
    req.session.authenticated = true;
    req.session.username = username;

    // Clear history and redirect to the logged-in page
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.redirect('/loggedin');
  } else {
    // If the user is not authenticated, redirect them to the login page with an error message
    res.redirect('/?error=Invalid%20username%20or%20password');
  }
});

app.get('/loggedin', requireAuth, (req, res) => {
  // Render the loggedin page, which can only be accessed by authenticated users
  const username = req.session.username || '';
  const user = req.session.authenticated ? username : 'not logged in';
  res.render('loggedin', { username: username, user: user });
});

app.get('/logout', (req, res) => {
  // Log the user out by destroying their session
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = app;
