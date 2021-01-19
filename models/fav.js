const mongoose = require("mongoose");

const favSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
});

module.exports = new mongoose.model("Fav", favSchema);