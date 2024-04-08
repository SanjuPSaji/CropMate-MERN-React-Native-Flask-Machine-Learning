const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    postId: {
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
    commentSeq: {
        type: Number,
        required: false,
    },
})

// Pre-save middleware to autoincrement the commentSeq field
CommentSchema.pre('save', async function(next) {
    try {
        if (!this.commentSeq) {
            // Find the maximum value of commentSeq in the collection
            const maxSeq = await this.constructor.findOne({})
                .sort('-commentSeq')
                .select('commentSeq')
                .lean();

            // Increment the commentSeq by 1 or set to 1 if no documents exist
            this.commentSeq = maxSeq ? maxSeq.commentSeq + 1 : 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("comment", CommentSchema);