const express = require('express');
const router = express.Router();

router.use(require('./api-thoughts'));
router.use(require('./api-users'));

module.exports = router;
