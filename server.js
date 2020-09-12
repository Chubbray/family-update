const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}!`);
    });
});

//needs to be moved to another file

mongoose.set("useCreateIndex", true);
mongoose.set("debug", true);

db.User.create({ userName: "John Doe" })
    .then(dbUser => {
        console.log(dbUser);
    })
    .catch(({ message }) => {
        console.log(message);
    });

app.get("/thought", (req, res) => {
    db.Thought.find({})
        .then(dbThought => {
            res.json(dbThought);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/reaction", (req, res) => {
    db.Reaction.find({})
        .then(dbReaction => {
            res.json(dbReaction);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/user", (req, res) => {
    db.User.find({})
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/submit", ({ body }, res) => {
    db.Thought.create(body)
        .then(({ _id }) =>
            db.User.findOneAndUpdate({}, { $push: { thought: _id } }, { new: true })
        )
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/submit", ({ body }, res) => {
    db.Reaction.create(body)
        .then(({ _id }) =>
            db.User.findOneAndUpdate({}, { $push: { reaction: _id } }, { new: true })
        )
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/populate", (req, res) => {
    db.User.find({})
        .populate({
            path: "thought",
            select: "-__v"
        })
        .select("-__v")
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/populate", (req, res) => {
    db.User.find({})
        .populate({
            path: "reaction",
            select: "-__v"
        })
        .select("-__v")
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});


