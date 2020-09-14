const { Schema, model } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
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
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
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