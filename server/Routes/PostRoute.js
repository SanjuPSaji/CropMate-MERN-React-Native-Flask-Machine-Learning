const { Post } = require('../Controllers/PostController');
const { Postfetch } = require('../Controllers/PostController');
const { PostId } = require('../Controllers/PostController');
const { DeletePostAndComments } = require('../Controllers/PostController');
const router = require("express").Router();

router.post("/Post", Post);
router.get("/Postfetch", Postfetch);
router.get("/PostId", PostId);
router.delete('/DeletePostAndComments', DeletePostAndComments);
module.exports = router;