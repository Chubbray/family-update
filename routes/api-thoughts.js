const router = require("express").Router();
const { User, Thought, Reaction } = require("../models");
const Thought = require("../models/Thought");

router.get("/", (req, res) => {
  Thought.findAll({
    include: [User,
    {
      model: Reaction,
      through: Thought,
    }]
  })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Thought.findOne({
    where: {
      id: req.params.id
    },

    include: [User,
      {
        model: Reaction,
        through: Thought,
      }]
  })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  Thought.create(
    {
      thoughtText: "This is what I think!",
      username: "johndoe",
      userId: [1, 2, 3, 4]
    })

    .then(dbThoughtData => res.status(200).json(dbThoughtData))

    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  
  Thought.create(req.body)
    .then((product) => {
      if (req.body.UserIds.length) {
        const thoughtIdArr = req.body.userIds.map((user_id) => {
          return {
            thought_id: thouhgt.id,
            reaction_id,
          };
        });
        return Thought.bulkCreate(thoughtIdArr);
      }
      res.status(200).json(product);
    })
    .then((thoughtIds) => res.status(200).json(thoughtIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Thought.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((thought) => {
      return Thought.findAll({ where: { thought_id: req.params.id } });
    })
    .then((thought) => {
      const thoughtIds = thought.map(({ user_id }) => user_id);
      const newThought = req.body.userIds
        .filter((tag_id) => !thoughtIds.includes(user_id))
        .map((user_id) => {
          return {
            thought_id: req.params.id,
            user_id,
          };
        });
      const thoughtToRemove = thought
        .filter(({ user_id }) => !req.body.userIds.includes(user_id))
        .map(({ id }) => id);
      return Promise.all([
        Thought.destroy({ where: { id: thoughtToRemove } }),
        Thought.bulkCreate(newThought),
      ]);
    })
    .then((updatedThought) => res.json(updatedThought))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Thought.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbThoughtData => res.status(200).json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
