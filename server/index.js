const express = require('express');
const db = require('./db/connexion.js');
const userRouter = require('./routes/userRoute.js');
const contactRoute = require('./routes/contactRoute.js');
const authRoute = require('./routes/authRoute');
const path = require('path');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger');


require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
db();

const app = express();
app.use(cors());

const port = 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoute);
app.use('/contacts', contactRoute);
app.use('/', userRouter);

// Port Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${PORT}`);
});