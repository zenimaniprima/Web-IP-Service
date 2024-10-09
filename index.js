const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./src/router.js');
const knex = require('./src/dbConnection.js')
const app = express();

const routerIndex = express.Router();
const port = 3005;
const host = '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());

routerIndex.get('/test', async (req, res) => {
  const result = await knex.raw('select 1+1 as result');
  res.status(200).send({ message: 'success', data: result });
});
app.use('/api', router);
app.use('/api', routerIndex);


app.listen(port, host, () => console.log(`app is running in ${host}:${port}`));
