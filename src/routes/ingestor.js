const ingestorController = require('../controllers/ingestor');

const express = require('express');

const router = express.Router();

router.get("/filter/:ftr", ingestorController.filterController);

router.get('/filterTime', ingestorController.timeFilterController);

router.post("/ingest", ingestorController.ingestorController);

router.get('/filterRegex', ingestorController.regularExpressionSearch);

module.exports = router;