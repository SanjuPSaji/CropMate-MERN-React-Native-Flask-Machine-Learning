const { Comment, Commentfetch, DeleteComment,UpdateComment } = require('../Controllers/CommentController');
const router = require("express").Router();

router.post("/Comment", Comment);
router.get("/Commentfetch", Commentfetch);
router.put("/UpdateComment", UpdateComment);
router.delete("/DeleteComment", DeleteComment);
module.exports = router;