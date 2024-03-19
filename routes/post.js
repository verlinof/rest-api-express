const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

//Route
router.get('/', postController.index);
router.post('/', postController.store);
router.patch('/:id', postController.update);
router.get('/:id', postController.show);

module.exports = router