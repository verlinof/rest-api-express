const models = require('../models');

function store(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: 1
  }

  //To create the data, and insert to database, like laravel
  models.Post.create(post).then(() => {
    res.status(201).send({
      message: 'Post created successfully',
      data: post
    })
  }).catch(err => {
    res.status(500).send({
      message: err.message
    })
  });
}

module.exports = {
  store
}