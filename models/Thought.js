const { Schema, model } = require("mongoose");
const moment = require("moment");

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Enter your thoughts here",
        minlength: 1 - 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: moment().format(),
    },
    username: {
        type: String,
        required: "Username is Required",
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reaction",
        },
    ],
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;