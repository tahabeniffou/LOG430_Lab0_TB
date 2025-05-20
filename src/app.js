const express = require('express');
const app = express();

app.use(express.json());

// Routes basiques
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur POS !');
});

module.exports = app;
