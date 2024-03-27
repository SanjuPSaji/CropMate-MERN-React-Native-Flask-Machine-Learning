const mongoose = require("mongoose");

const DetailsSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    Nitrogen: {
        type: Number,
        required: true,
    },
    Phosphorus: {
        type: Number,
        required: true,
    },
    Potassium: {
        type: Number,
        required: true,
    },
    Temperature: {
        type: Number,
        required: true,
    },
    Humidity: {
        type: Number,
        required: true,
    },
    pH: {
        type: Number,
        required: true,
    },
    Rainfall: {
        type: Number,
        required: true,
    }
        
});



module.exports = mongoose.model("details", DetailsSchema);