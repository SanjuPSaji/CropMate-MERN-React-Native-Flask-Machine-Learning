const PostModel = require('../Models/PostModel');

module.exports.Post = async (req, res, next) => {
    const { heading, content, creatorname, creatorId } = req.body;

    try {
        const post = await PostModel.create({
            heading,
            content,
            creatorname,
            creatorId,
        });
        res.status(201).json({ message: 'Post created successfully' });
        next();

    } catch (error) {
        console.error(error);
      }
}

module.exports.Postfetch = async (req, res, next) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}