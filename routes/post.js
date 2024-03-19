const express = require('express');
const postController = require('../controllers/post.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

//Route
router.get('/', postController.index);
router.post('/', checkAuthMiddleware.checkAuth, postController.store);
router.patch('/:id', checkAuthMiddleware.checkAuth, postController.update);
router.get('/:id', checkAuthMiddleware.checkAuth, postController.show);

module.exports = router