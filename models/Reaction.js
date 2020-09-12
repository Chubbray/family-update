const { Schema, model } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: "Enter your reaction here",
        maxlength: 280,
    },
    username: {
        type: String,
        required: "Username is Required",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        getDate: moment().format(),
        required: true,
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);


module.exports = ReactionSchema;