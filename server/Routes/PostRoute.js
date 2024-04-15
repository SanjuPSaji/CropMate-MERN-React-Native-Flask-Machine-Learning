const { Post, Postfetch, PostId, DeletePostAndComments, UpdatePost } = require('../Controllers/PostController');
const router = require("express").Router();

router.post("/Post", Post);
router.get("/Postfetch", Postfetch);
router.get("/PostId", PostId);
router.put("/UpdatePost", UpdatePost);
router.delete('/DeletePostAndComments', DeletePostAndComments);
module.exports = router;