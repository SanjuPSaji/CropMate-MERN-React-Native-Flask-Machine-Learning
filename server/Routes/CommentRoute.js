const { Comment } = require('../Controllers/CommentController');
const { Commentfetch } = require('../Controllers/CommentController');
// const { PostId } = require('../Controllers/PostController');
const router = require("express").Router();

router.post("/Comment", Comment);
router.get("/Commentfetch", Commentfetch);
// router.post("/PostId", PostId);
module.exports = router;