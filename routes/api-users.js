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
