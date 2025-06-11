// server.js
require('dotenv').config();
const express     = require('express');
const cors        = require('cors');
const restApi     = require('./src/api/rest');
const { swaggerSpec } = require('./src/api/rest/swagger');
const swaggerUi   = require('swagger-ui-express');
const redoc       = require('redoc');

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
}));

app.use(express.json());

const AUTH_TOKEN = process.env.AUTH_TOKEN;
function authMiddleware(req, res, next) {

  if (
    req.path.startsWith('/api-docs') ||
    req.path === '/redoc' ||
    req.path === '/api-docs/swagger.json'
  ) {
    return next();
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === `Bearer ${AUTH_TOKEN}`) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}


app.use('/api/v1', authMiddleware, restApi);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


app.get(
  '/redoc',
  redoc({ title: 'API LOG430 Lab TB POS', specUrl: '/api-docs/swagger.json' })
);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API démarrée sur le port ${PORT}`));
