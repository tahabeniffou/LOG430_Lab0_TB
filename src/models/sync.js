const sequelize = require('./index');
require('./Produit');
require('./Categorie');
require('./Vente');
require('./Utilisateur');
require('./LigneVente');
require('./Paiement');

sequelize.sync({ force: false }).then(() => {
  console.log('Base de données synchronisée');
});