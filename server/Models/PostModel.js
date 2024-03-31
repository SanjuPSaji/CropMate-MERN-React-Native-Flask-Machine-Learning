const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    creatorname: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    }, 
})

module.exports = mongoose.model("posts", PostSchema);