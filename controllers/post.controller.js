const models = require('../models');

function index(req, res) {
  models.Post.findAll().then(posts => {
    res.status(200).send({
      message: 'Posts found',
      data: posts
    })
  }).catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

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

function show(req, res) {
  const id = req.params.id
  models.Post.findByPk(id).then(post => {
    if (post) {
      res.status(200).send({
        message: 'Post found',
        data: post
      })
    } else {
      res.status(404).send({
        message: 'Post not found'
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const post = await models.Post.findByPk(id);

    const postData = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      categoryId: req.body.categoryId,
      userId: 1
    };

    if (!post) {
      return res.status(404).send({
        message: "Post not found"
      });
    }

    await post.update(postData);

    res.status(200).send({
      message: "Post updated successfully",
      data: post
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error"
    });
  }
}

module.exports = {
  index,
  store,
  show,
  update
}