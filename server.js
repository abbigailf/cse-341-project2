const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { initDb } = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

dotenv.config();
require('./config/passport');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// This is the basic express session({..}) initialization.
app.use(passport.initialize())
// init passport on every route call.
app.use(passport.session())
// allow passport to use "express-session".

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://cse-341-project2-1nop.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

app.get('/', (req, res) => {
  if (req.user) {
    return res.send(`Logged in as ${req.user.displayName}`);
  }
  res.send("Logged Out");
});


app.use('/auth', require('./routes/auth'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });