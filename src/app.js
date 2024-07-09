const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');

const xss = require('xss');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render("index");
});

app.post('/index', (req, res) => {
  const comment = req.body.Comments;
  console.log('Received comment:', comment);

  // res.send(`${comment}`);
  const sanitizedComment = xss(comment);
  res.send(`${sanitizedComment}`);

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
