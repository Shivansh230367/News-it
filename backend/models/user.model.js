const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    country:{
        type: String,
    },
    interest: {
        type: String,
        enum: ["business","entertainment","health","general","science","sports","technology"],
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;