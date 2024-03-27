const mongoose = require("mongoose");

const CropSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    Crop1: {
        type: String,
        required: true,
    },
    Crop2: {
        type: String,
        required: true,
    },
    Crop3: {
        type: String,
        required: true,
    },
    Crop4: {
        type: String,
        required: true,
    },
    Crop5: {
        type: String,
        required: true,
    }
        
});



module.exports = mongoose.model("crops", CropSchema);