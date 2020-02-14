const express = require('express');
const date = require(`${__dirname}/date.js`);
const db = require(`${__dirname}/db.js`);
const port = 3600;

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.json({
  type: ['application/json', 'text/plain']
}));

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/public/list.html`);
});

app.post('/load', async (req, res) => {

  const obj = {}
  const day = await date.getDate();
  const posts = await db.loadPosts();

  obj.date = day;
  obj.posts = posts;
  res.send(obj);

});

app.post('/post', (req, res) => {
  db.newItem(req.body.post);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  db.deleteItem(req.body.post);
  res.send();
});

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
