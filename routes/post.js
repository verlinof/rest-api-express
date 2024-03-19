const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', postController.store);

module.exports = router