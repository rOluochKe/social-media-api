const express = require('express');
const { createPostValidator } = require('../validator');

const { getPosts, createPost } = require('../controllers/post');

const router = express.Router();

router.get('/', getPosts);
router.post('/post', createPost, createPostValidator);

module.exports = router;