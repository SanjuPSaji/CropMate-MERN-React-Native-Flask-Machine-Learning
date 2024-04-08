const { Comment, Commentfetch, DeleteComment } = require('../Controllers/CommentController');
const router = require("express").Router();

router.post("/Comment", Comment);
router.get("/Commentfetch", Commentfetch);
router.delete("/DeleteComment", DeleteComment);
module.exports = router;