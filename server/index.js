const express = require('express');
const db = require('./db/connexion.js');
const userRouter = require('./routes/userRoute.js');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoute = require('./routes/authRoute');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
db();

const app = express();
const port = 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API MyContacts',
      version: '1.0.0',
      description: 'Documentation de l\'API MyContacts',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./server/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoute);
app.use('/', userRouter);

app.listen(port, () => {
  console.log("Good ! \nserver running on port", port);
});
