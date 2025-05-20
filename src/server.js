const app = require('./app');
require('./models/sync'); // Synchronise DB automatiquement

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
