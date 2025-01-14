const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
    },
    details: {
        type: String,
        required: true,
    }
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;