// NOTES FROM https://btholt.github.io/intro-to-web-dev-v2/node

/* EXAMPLE 1 */
// const http = require('http');

// const server = http.createServer(function(req, res) {
//   console.log(`user visited ${req.url}`);
//   res.end('hello!');
// });

// console.log('listening on http://localhost:3000');
// server.listen(3000);

// run `node server.js` to preview

/* EXAMPLE 2 */

const express = require('express');
const path = require('path');

const complements = [
  'You like nice today',
  'That dress looks nice on you',
  'Have you been working out?',
  'You can do hard things',
  "You've gotten far in this course. You're really smart",
  "You're programming! How cool is that?",
  "I'm really proud of you",
  'You made this',
  "You've learned a lot of things, and that's pretty hard to do",
];

// return a random item from the complements array
function getRandomComplement() {
  const randomIndex = Math.floor(Math.random() * complements.length);
  return complements[randomIndex];
}

const app = express(); // create a new server

// * Note: A route is how you handle the request when a user hits a particular URL.

// Set up default homepage route
// app.get('/', function(req, res) {
//   res.end('Welcome to my site!');
// });

// set up route for /complement
// app.get('/complement', function(req, res) {
//   res.end('You look nice today');
// });

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// use complement API
app.get('/complement', function(req, res) {
  res
    .json({
      complement: getRandomComplement(),
    })
    .end();
});

app.use('/public', express.static('./public'));

app.listen(3000);
console.log('listening on http://localhost:3000');
