const { Schema, model } = require("mongoose");
const moment = require("moment");
const reactionSchema = require("./Reaction");

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Enter your thoughts here",
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
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
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;