const { Crop } = require('../Controllers/CropController');
const { Cropfetch } = require('../Controllers/CropController');
const router = require("express").Router();

router.post("/Crop", Crop);
router.post("/Cropfetch", Cropfetch);

module.exports = router;