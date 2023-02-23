const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authenticationRouter = require('./routes/authentication');

const app = express();

// uses the public folder in the app TODO make sure to delete the age part
app.use(express.static(__dirname + '/public', { maxAge: 0, etag: false, lastModified: false, cacheControl: false }));


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Mount authentication router
app.use(authenticationRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = app;
