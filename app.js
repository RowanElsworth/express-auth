const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Example database obviously
const users = [
  { username: 'alice', password: 'password' },
  { username: 'bob', password: 'letmein' },
  { username: 'charlie', password: 'hello123' }
];

// Middleware function to check for authentication
const requireAuth = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    return next();
  }
  res.redirect('/');
};

app.get('/', (req, res) => {
  const username = req.session.username || '';
  const user = req.session.authenticated ? username : 'not logged in';
  res.render('login', { error: req.query.error, username: username, user: user });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // If the user is authenticated, set a session variable and redirect them to the secret page
    req.session.authenticated = true;
    req.session.username = username;
    res.redirect('/secret');
  } else {
    // If the user is not authenticated, redirect them to the login page with an error message
    res.redirect('/?error=Invalid%20username%20or%20password');
  }
});

app.get('/secret', requireAuth, (req, res) => {
  // Render the secret page, which can only be accessed by authenticated users
  const username = req.session.username || '';
  const user = req.session.authenticated ? username : 'not logged in';
  res.render('secret', { username: username, user: user });
});


app.post('/logout', (req, res) => {
  // Log the user out by destroying their session
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
