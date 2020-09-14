// const router = require("express").Router();
// const { User, Thought, Reaction } = require("../models");

// mongoose.set("useCreateIndex", true);
// mongoose.set("debug", true);

// db.User.create({ userName: "John Doe" })
//     .then(dbUser => {
//         console.log(dbUser);
//     })
//     .catch(({ message }) => {
//         console.log(message);
//     });

// app.get("/thought", (req, res) => {
//     db.Thought.find({})
//         .then(dbThought => {
//             res.json(dbThought);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/reaction", (req, res) => {
//     db.Reaction.find({})
//         .then(dbReaction => {
//             res.json(dbReaction);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/user", (req, res) => {
//     db.User.find({})
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.post("/submit", ({ body }, res) => {
//     db.Thought.create(body)
//         .then(({ _id }) =>
//             db.User.findOneAndUpdate({}, { $push: { thought: _id } }, { new: true })
//         )
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.post("/submit", ({ body }, res) => {
//     db.Reaction.create(body)
//         .then(({ _id }) =>
//             db.User.findOneAndUpdate({}, { $push: { reaction: _id } }, { new: true })
//         )
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/populate", (req, res) => {
//     db.User.find({})
//         .populate({
//             path: "thought",
//             select: "-__v"
//         })
//         .select("-__v")
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// app.get("/populate", (req, res) => {
//     db.User.find({})
//         .populate({
//             path: "reaction",
//             select: "-__v"
//         })
//         .select("-__v")
//         .then(dbUser => {
//             res.json(dbUser);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });


const router = require("express").Router();
const { User, Thought, Reaction } = require("../models");


router.get("/", (req, res) => {
  User.findAll({
    include: [Thought, Reaction],
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [Thought, Reaction]
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  User.create(
      {
          username: "johndoe",
          email: "johndoe@gmail.com",
      },
    req.body
  )
    .then(dbUserData => res.status(200).json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  User.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    })
    .then(dbUserData => res.status(200).json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => res.status(200).json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
