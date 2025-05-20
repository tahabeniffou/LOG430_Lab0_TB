const sequelize = require('./index');
require('./Product');
require('./Sale');

sequelize.sync({ force: false })
  .then(() => console.log('Base de données synchronisée'))
  .catch(console.error);
