const CommentModel = require('../Models/CommentModel');

module.exports.Comment = async (req, res, next) => {
    const { reply, postId, creatorname, creatorId } = req.body;

  try {
    // Create a new instance of the Comment model
    const newComment = new CommentModel({
      reply,
      postId,
      creatorname,
      creatorId,
    });

    // Save the new comment to the database
    await newComment.save();

    // Respond with success message
    res.status(201).json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    // Handle errors
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports.Commentfetch = async (req, res, next) => {
  const { postId } = req.query; // Assuming postId is passed as a route parameter

  try {
      // Fetch all comments associated with the given postId
      const comments = await CommentModel.find({ postId });

      // Respond with the retrieved comments
      res.status(200).json({ status: true, comments });
  } catch (error) {
      // Handle errors
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

