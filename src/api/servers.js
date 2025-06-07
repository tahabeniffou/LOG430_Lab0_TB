const express = require('express');
const cors = require('cors');
const app = express();
const stockRoutes = require('./routes/stockRoutes');
const salesRoutes = require('./routes/salesRoutes');
const productRoutes = require('./routes/productRoutes');
const logistiqueRoutes = require('./routes/logistiqueRoutes');
const maisonMereRoutes = require('./routes/maisonMereRoutes');
const magasinRoutes = require('./routes/magasinRoutes');


app.use('/magasins', magasinRoutes);
app.use(express.json());
app.use(cors());
app.use('/magasins/:magasinId/stock', stockRoutes);
app.use('/magasins/:magasinId/ventes', salesRoutes);
app.use('/magasins/:magasinId/produits', productRoutes);
app.use('/logistique', logistiqueRoutes); 
app.use('/maison-mere', maisonMereRoutes);
app.use('/magasins/:magasinId/stock', stockRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API démarrée sur le port ${PORT}`));