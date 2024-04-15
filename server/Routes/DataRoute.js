const { Data, dataToML, Datafetch } = require('../Controllers/DataController');
const router = require("express").Router();

router.post("/data", Data);
router.post("/datafetch", Datafetch);
router.post("/datatoml", dataToML);

module.exports = router;