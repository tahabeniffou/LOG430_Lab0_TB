// src/api/servers.js
require('dotenv').config();
const express       = require('express');
const cors          = require('cors');
const restModule    = require('./rest/index.js');
const restApi       = restModule.default || restModule;
const swaggerModule = require('./rest/swagger.js');
const swaggerSpec   = swaggerModule.swaggerSpec || swaggerModule.default || swaggerModule;
const swaggerUi     = require('swagger-ui-express');
const redocExpress  = require('redoc-express');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGINS?.split(',') || '*' }));
app.use(express.json());

app.use('/api/v1', restApi);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.get('/api-docs/swagger.json', (req, res) => res.json(swaggerSpec));
app.get(
  '/redoc',
  redocExpress({
    title: 'API LOG430 Lab TB POS',
    specUrl: '/api-docs/swagger.json'
  })
);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    timestamp: new Date().toISOString(),
    status,
    error:   err.name,
    message: err.message,
    path:    req.originalUrl
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API démarrée sur le port ${PORT}`));
