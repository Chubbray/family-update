const express = require("express");
const router = express.Router();

router.use(require("./api-thoughts"));
router.use(require("./api-users"));

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });

module.exports = router;
