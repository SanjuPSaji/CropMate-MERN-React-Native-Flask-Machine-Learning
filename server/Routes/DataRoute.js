const { Data } = require('../Controllers/DataController');
const { Datafetch } = require('../Controllers/DataController');
const router = require("express").Router();

router.post("/data", Data);
router.post("/datafetch", Datafetch);

module.exports = router;