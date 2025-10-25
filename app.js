const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

const swaggerDocument = require('./resources/swagger.json');

const app = express();
app.use(bodyParser.json());

// Swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/users', userRoutes);
app.use('/articles', articleRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
