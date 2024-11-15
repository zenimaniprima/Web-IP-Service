const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./src/router.js');
const knex = require('./src/dbConnection.js');
const app = express();

const routerIndex = express.Router();
const port = 3005;
const host = '0.0.0.0';

const allowedOrigins = [
  'https://imaniprima.co.id',
  'http://localhost:3001',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);
app.use(bodyParser.json());

routerIndex.get('/test', async (req, res) => {
  const result = await knex.raw('select 1+1 as result');
  res.status(200).send({ message: 'success', data: 'success' });
});

app.use('/api', router);
app.use('/api', routerIndex);

app.listen(port, host, async () => {
  console.log(`app is running in ${host}:${port} ${process.env.NODE_ENV}`);
  const result = await knex.raw('select 1+1 as result');
  if (result[0][0].result === 2) {
    console.log('db connection success');
  } else {
    console.log('db connection failed');
  }
});
