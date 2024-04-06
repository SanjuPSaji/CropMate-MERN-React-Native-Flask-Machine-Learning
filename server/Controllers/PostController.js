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

module.exports.PostId = async (req, res, next) => {
    const { postId } = req.body;
    try {
        const posts = await PostModel.findById(postId);
        if(!posts){
            return res.json({message:'This Post no longer exists or the link is invalid.'})
        }
        res.status(200).json({
            status: true,
            _id: posts._id,
            heading : posts.heading,
            content : posts.content,
            creatorname : posts.creatorname,
            createdAt : posts.createdAt,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}