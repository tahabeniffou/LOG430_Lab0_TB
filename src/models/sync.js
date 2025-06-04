const sequelize = require('./index');
require('./Magasin');
require('./Categorie');
require('./Produit');
require('./Utilisateur');
require('./Vente');
require('./LigneVente');
require('./Paiement');
require('./CentreLogistique');
require('./DemandeReappro');

sequelize.sync({ force: false }).then(() => {
  console.log('Base de données synchronisée');
});