const { Post } = require('../Controllers/PostController');
const { Postfetch } = require('../Controllers/PostController');
const { PostId } = require('../Controllers/PostController');
const router = require("express").Router();

router.post("/Post", Post);
router.post("/Postfetch", Postfetch);
router.post("/PostId", PostId);
module.exports = router;