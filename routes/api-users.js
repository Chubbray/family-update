const router = require("express").Router();
const { User, Thought, Reaction } = require("/models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products

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
  // find one category by its `id` value
  // be sure to include its associated Products

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
  // create a new category

  User.create(
    req.body
  )
    .then(dbUserData => res.status(200).json(dbUserData))

    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value

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
  // delete a category by its `id` value

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
