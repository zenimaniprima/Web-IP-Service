const express = require('express');
const router = express.Router();
const service = require('./service');

router.post('/sales', async (req, res) => {
  try {
    const result = await service.storeSales(req.body);
    res.status(200).send({ message: 'success', data: result });
  } catch (error) {
    res.status(500).send({ message: 'error', data: error });
  }
});

router.post('/career', async (req, res) => {
  try {
    const result = await service.storeCareer(req.body);
    res.status(200).send({ message: 'success', data: result });
  } catch (error) {
    res.status(500).send({ message: 'error', data: error });
  }
});

router.post('/download', async (req, res) => {
  try {
    const result = await service.storeDownload(req.body);
    res.status(200).send({ message: 'success', data: result });
  } catch (error) {
    res.status(500).send({ message: 'error', data: error });
  }
});

module.exports = router;
