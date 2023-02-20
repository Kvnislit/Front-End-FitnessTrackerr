const express = require('express');
const app = express();
const path = require('path');

process.env.DATABASE_URL = 'postgres://juice_box_w9cn_user:onGvjGzWYqg8ekgebhxK4YyE22KjPE68@dpg-cf6jlp4gqg47vk0olv6g-a/juice_box_w9cn';

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`listening on port ${port}`);
});