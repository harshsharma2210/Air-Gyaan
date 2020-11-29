// post.model.js

const express = require('express');
const postRoutes = express.Router();

// Require Post model in our routes module
const { addPosts, getAllPosts, getPostsById, updatePostsById, deletePostsById } = require('../controllers/posts');

// Defined store route
postRoutes.route('/').post(addPosts);

// Defined get data(index or listing) route
postRoutes.route('/').get(getAllPosts);

// Defined edit route
postRoutes.route('/:id').get(getPostsById);

//  Defined update route
postRoutes.route('/:id').put(updatePostsById);

// Defined delete | remove | destroy route
postRoutes.route('/:id').delete(deletePostsById);

module.exports = postRoutes;
