const models = require('../models');
//Validator
const Validator = require('fastest-validator');

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

async function store(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: 1
  }

  //Validate Input and Data
  const schema = {
    title: { type: 'string', optional: false, max: '100' },
    content: { type: 'string', optional: false, max: '5000' },
    imageUrl: { type: 'string', optional: false },
    categoryId: { type: 'number', optional: false },
    userId: { type: 'number', optional: false }
  };

  //Validating
  const validator = new Validator();
  const validationResponse = await validator.validate(post, schema);

  if (validationResponse !== true) {
    return res.status(400).send({
      message: 'Validation failed',
      data: validationResponse
    })
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

    //Validate Input and Data
    const schema = {
      title: { type: 'string', optional: false, max: '100' },
      content: { type: 'string', optional: false, max: '5000' },
      imageUrl: { type: 'string', optional: false },
      categoryId: { type: 'number', optional: false },
      userId: { type: 'number', optional: false }
    };

    //Validating
    const validator = new Validator();
    const validationResponse = await validator.validate(postData, schema);

    if (validationResponse !== true) {
      return res.status(400).send({
        message: 'Validation failed',
        data: validationResponse
      });
    }

    await post.update(postData);

    res.status(200).send({
      message: "Post updated successfully",
      data: post
    });
  } catch (error) {
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